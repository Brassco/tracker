import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard
} from "react-native";
import { Header, Container, ProfileRow, ButtonDefault } from "../../common";
import styles from "./styles";
import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      skype: "",
      title: "",
      phone: "",
      github: "",
      bitbucket: "",
      keyboardShow: false,
      password: "",
      user: null
    };
  }

  writeToClipboard = async text => {
    await Clipboard.setString(text);
  };

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;

    this.unsubscriber = usersRef.doc(currentUser.email).onSnapshot(userData => {
      let {
        firstName,
        lastName,
        email,
        skype,
        title,
        phone,
        github,
        bitbucket
      } = userData.data();

      this.setState({
        user: currentUser,
        firstName,
        lastName,
        email,
        skype,
        title,
        phone,
        github,
        bitbucket
      });
    });
  }

  render() {
    let {
      titleContainer,
      titleText,
      subTitle,
      buttonWrapper,
      descriptionText,
      descriptionTextWrapper
    } = styles;
    if (this.state.user == null) {
      return <ActivityIndicator />;
    } else {
      const {
        email,
        firstName,
        lastName,
        skype,
        phone,
        bitbucket,
        github,
        title
      } = this.state;
      return (
        <Container>
          <Header
            title={"Profile"}
            openDrawer={() => {
              try {
                this.props.navigation.openDrawer();
              } catch (e) {}
            }}
            rightButton={
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("EditProfile")}
              >
                <Text style={styles.rightButtonText}>Edit</Text>
              </TouchableOpacity>
            }
          />
          <View style={titleContainer}>
            <Text style={titleText}>
              {firstName} {lastName}
            </Text>
            <Text style={subTitle}>{title}</Text>
          </View>
          <ProfileRow
            imageSrc={require("../../../assets/images/xxxhdpi/email.png")}
            onCopy={() => this.writeToClipboard(email)}
          >
            {email}
          </ProfileRow>
          {!!skype && (
            <ProfileRow
              imageSrc={require("../../../assets/images/xxxhdpi/skype.png")}
            >
              {skype}
            </ProfileRow>
          )}
          {!!phone && (
            <ProfileRow
              imageSrc={require("../../../assets/images/xxxhdpi/phone.png")}
            >
              {phone}
            </ProfileRow>
          )}
          {!!bitbucket && (
            <ProfileRow
              imageSrc={require("../../../assets/images/xxxhdpi/bitbacket.png")}
              onCopy={() => this.writeToClipboard(bitbucket)}
            >
              {bitbucket}
            </ProfileRow>
          )}
          {!!github && (
            <ProfileRow
              imageSrc={require("../../../assets/images/xxxhdpi/git.png")}
              onCopy={() => this.writeToClipboard(github)}
            >
              {github}
            </ProfileRow>
          )}
          <View style={buttonWrapper}>
            <ButtonDefault
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              Change password
            </ButtonDefault>
          </View>
          <View style={descriptionTextWrapper}>
            <Text style={descriptionText}>
              An email will be send to you with the details to reset your
              password
            </Text>
          </View>
        </Container>
      );
    }
  }
}

export default Profile;
