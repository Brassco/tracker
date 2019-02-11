import React from "react";
import {
  AsyncStorage,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  Text,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import ItemMenu from "./Components/ItemMenu";

import { Layout, Colors, DefaultStyles, User, Func } from "../../constants";
import styles from "./styles";
const { width, height } = Layout.window;

import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");
const projectsRef = db.collection("projects");

class DrawerDecaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Activity",
      email: "",
      uid: "",
      haveIOwnProjects: false,
      people: [],
      user: { ...User.getUserObj() }
    };
  }

  static getDerivedStateFromProps(props, state) {
    const arr = [...props.navigation.state.routes[0].routes].map(i => {
      return i.routeName;
    });
    if (!arr.length) {
      return { active: "Activity" };
    } else {
      const active = arr[arr.length - 1];
      return { active };
    }
  }

  componentDidMount = () => {
    try {
      this.onTokenRefreshListener = firebase
        .messaging()
        .onTokenRefresh(fcmToken => {
          usersRef.doc(email).update({
            pushToken: this.state.pushToken
          });
        });
      this.onChangedUserInfo();
      Keyboard.dismiss();
      this._listenDatabase();
    } catch (e) {
      console.log("error componentDidMount", e);
    }
  };

  _sortArray = array => {
    let arr = [];
    array
      .map(itemOr => {
        itemOr.name = !itemOr.name ? itemOr.email : itemOr.name;
        arr[itemOr.email] = itemOr;
      })
      .sort((a, b) => (a.name < b.name ? -1 : a.name == b.name ? 0 : 1));
    return Object.values(arr).sort((a, b) =>
      a.name > b.name ? -1 : a.name == b.name ? 0 : 1
    );
  };

  _listenDatabase = () => {
    if (!!this.unsubscriber) this.unsubscriber();
    let { user, haveIOwnProjects, people } = this.state;

    this.unsubscriberAuth = firebase.auth().onAuthStateChanged(user => {
      if (!!user && !!user.uid) {
        firebase.auth().languageCode = "ru";

        User.setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId
        });

        this.setState({ user });
      } else {
        this.props.navigation.navigate("AuthorizationNavigator");
      }
    });

    this.unsubscriber = projectsRef.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (!haveIOwnProjects) {
          haveIOwnProjects = doc.get("isOwner") == user.uid;
          this.setState({ haveIOwnProjects });
        }
        if (doc.get("isOwner") == user.uid) {
          const team = doc.get("team");
          people = this._sortArray([...people, ...team]);
          this.setState({
            haveIOwnProjects: true,
            people
          });
        }
      });
    });
  };

  componentWillUnmount() {
    try {
      Keyboard.dismiss();
      if (!!this.onTokenRefreshListener) this.onTokenRefreshListener();
      if (this.unsubscriber) this.unsubscriber();
      if (this.unsubscriberAuth) this.unsubscriberAuth;
    } catch (e) {
      console.log("error componentWillUnmount", e);
    }
  }
  onChangedUserInfo = () =>
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        User.setUserObj({ ...user._user });
      } else {
        console.log("onChangedUserInfo Error");
      }
    });

  recordUserLogOut() {
    usersRef.doc(this.state.user.email).update({
      lastLogOutTime: new Date()
    });
  }

  logOut = async () => {
    const signOut = () => {
      firebase
        .auth()
        .signOut()
        .catch(function(error) {});
    };
    Func.noDoublePress(signOut);
  };

  goPage = (pageName, args = {}) => {
    if (pageName == "Activity") this.props.navigation.closeDrawer();
    const func = () => this.props.navigation.navigate(pageName, { args: args });
    Func.noDoublePress(func);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { haveIOwnProjects, people, active } = this.state;

    return (
      <ImageBackground
        style={[DefaultStyles.container, { flexDirection: "row" }]}
        source={require("../../assets/images/drawerFon.png")}
        resizeMode="cover"
      >
        <View style={styles.drawer}>
          <View style={styles.logo}>
            <Image
              style={{ width: "76%" }}
              source={require("../../assets/images/drawerLogo.png")}
              resizeMode="contain"
            />
          </View>
          <ScrollView contentContainerStyle={styles.list}>
            <ItemMenu
              func={() => this.goPage("Activity")}
              active={active == "Activity"}
              title="Activity"
              img={require("../../assets/images/xxxhdpi/activity.png")}
            />

            <ItemMenu
              func={() => this.goPage("Projects")}
              active={active == "Projects"}
              title="Projects"
              img={require("../../assets/images/xxxhdpi/projects.png")}
            />

            {haveIOwnProjects && people.length > 0 && (
              <ItemMenu
                func={() => this.goPage("People", people)}
                title="People"
                active={active == "People"}
                img={require("../../assets/images/xxxhdpi/people.png")}
              />
            )}

            <ItemMenu
              func={() => this.goPage("Profile")}
              active={active == "Profile"}
              title="Profile"
              img={require("../../assets/images/xxxhdpi/profile.png")}
            />
            {haveIOwnProjects && (
              <ItemMenu
                func={() => this.goPage("NewReport")}
                title="New report"
                active={active == "NewReport"}
                img={require("../../assets/images/xxxhdpi/new_report.png")}
              />
            )}
          </ScrollView>
          <View style={styles.footer}>
            <ItemMenu
              func={() => this.logOut()}
              end
              title="Sign Out"
              img={require("../../assets/images/xxxhdpi/logout.png")}
            />
          </View>
        </View>
        <View style={styles.whiteField}>
          <Icon
            name="menu"
            size={34}
            color={Colors.seaWave}
            onPress={() => this.props.navigation.closeDrawer()}
            underlayColor={Colors.lightGray}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default DrawerDecaration;
