import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import {
  Container,
  Header,
  CustomeTextInput,
  EmailTextInput
} from "../../common";
import UserRow from "./Components/UserRow";
import AnimatedUserRow from "./Components/AnimatedUserRow";
import { Func } from "../../../constants";
import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");
const projectsRef = db.collection("projects");

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      userEmail: null,
      keyboardShow: false,
      team: [],
      user: null
    };
    setTimeout(async () => {
      await Func.cleanInvitations();
    }, 0);
  }

  componentDidMount() {
    // this.unsubscribeUsers = usersRef.onSnapshot(this.onCollectionUpdate)
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      usersRef
        .doc(user.email)
        .get()
        .then(userData => {
          let team = [];
          let data = userData.data();
          team.push({
            email: data.email,
            name: data.firstName == null ? '' : `${data.firstName} ${data.lastName}`,
            isOwner: true
          });
          this.setState({
            user: data,
            team
          });
        });
    });
  }

  componentWillUnmount() {
    // this.unsubscribeUsers();
    this.unsubscriber();
  }

  onCreateProject = () => {
    let { team, user, description, title } = this.state;
    if (!!user && title.trim().length > 0) {
      projectsRef
        .add({
          Description: description,
          Title: title,
          lastActivity: new Date(),
          status: "In progress",
          team: team,
          isOwner: user.uid,
          isAdmin: ""
        })
        .then(project => {
          Func.sendMessages();
          return this.props.navigation.navigate("Projects");
        });
    } else {
      this.setState({
        title: ""
      });
      alert("Please fill required data");
    }
  };

  onInputText = (type, text) => {
    this.setState({
      [type]: text
    });
  };

  isEmailValid = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(this.state.userEmail);
  };

  onAddToTeam = () => {
    if (!!this.state.userEmail && this.state.userEmail.length) {
      if (this.isEmailValid()) {
        usersRef
          .doc(this.state.userEmail)
          .get()
          .then(userDara => {
            let user = userDara.data();
            let team = this.state.team;
            team.push({
              email: this.state.userEmail,
              name:
                user && user.firstName != null
                  ? `${user.firstName} ${user.lastName}`
                  : "",
              isOwner: false
            });

            // prepare Invitation To Project -- start
            const { userEmail, projectUid } = this.state;
            setTimeout(() => {
              Func.prepareInvitationToProject(projectUid, userEmail);
            }, 0);
            // prepare Invitation To Project -- end

            this.setState({
              team,
              userEmail: ""
            });
          });
      } else {
        alert("Incorrect email format");
      }
    } else {
      alert("Please enter user email");
    }
  };

  onDeleteFromTeam = email => {
    let team = this.state.team.filter(
      member => member.email.indexOf(email) < 0
    );
    this.setState({ team });
  };

  renderTeamMembers = () => {
    return this.state.team.map(member => {
      return member.isOwner ? (
        <UserRow
          key={member.email}
          email={member.email}
          name={member.name}
          isOwner={member.isOwner}
        />
      ) : (
        <AnimatedUserRow
          onDelete={this.onDeleteFromTeam}
          key={member.email}
          email={member.email}
          name={member.name}
          isOwner={member.isOwner}
        />
      );
    });
  };

  render() {
    if (this.state.user == null) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <Container>
          <StatusBar barStyle="dark-content" />
          <Header
            title={"Add New Project"}
            onBackPress={() => this.props.navigation.goBack()}
            rightButton={
              <TouchableOpacity onPress={this.onCreateProject}>
                <Text style={styles.rightButtonText}>Create</Text>
              </TouchableOpacity>
            }
          />
          <View
            style={{
              flex: 1,
              width: "90%"
            }}
          >
            <CustomeTextInput
              value={this.state.title}
              placeholder={"Title"}
              isRequire={true}
              onChangeText={text => this.onInputText("title", text)}
            />
            <CustomeTextInput
              value={this.state.description}
              placeholder={"Description"}
              onChangeText={text => this.onInputText("description", text)}
            />
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 8
                }}
              >
                <EmailTextInput
                  value={this.state.userEmail}
                  imageSrc={require("../../../assets/images/xxxhdpi/email.png")}
                  placeholder={"User e-mail"}
                  onChangeText={text => this.onInputText("userEmail", text)}
                />
              </View>
              <TouchableOpacity
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.onAddToTeam}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20
                  }}
                  source={require("../../../assets/images/xxxhdpi/plus.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                alignSelf: "stretch",
                borderBottomColor: "#111",
                borderBottomWidth: 2,
                marginVertical: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text>Team</Text>
              <Text>{this.state.team.length}</Text>
            </View>
            {this.renderTeamMembers()}
          </View>
        </Container>
      );
    }
  }
}
