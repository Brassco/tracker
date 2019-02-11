import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView
} from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";
import { Colors } from "../../../constants";
import { CustomeTextInput, Header, Container } from "../../common";
import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");

class EditProfile extends Component {
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
      user: null,
      focusedField: 0
    };
    // this.onFocus = this.onFocus.bind(this)
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      usersRef
        .doc(user.email)
        .get()
        .then(userData => {
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
            user,
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
    });
  }

  inputText = (type, text) => {
    this.setState({
      [type]: text
    });
  };

  saveUserData = () => {
    const { email, firstName, lastName, skype } = this.state;
    if (!firstName || firstName.length < 1) {
      alert("FirstName is required field");
      return;
    }
    if (!lastName || lastName.length < 1) {
      alert("LastName is required field");
      return;
    }
    if (!email || email.length < 6) {
      alert("Email is required field");
      return;
    }
    if (!skype || skype.length < 2) {
      alert("Skype is required field");
      return;
    }
    if (!!this.state.user && !!this.state.user.email) {
      usersRef
        .doc(this.state.user.email)
        .update({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          skype: this.state.skype,
          title: this.state.title,
          phone: this.state.phone,
          github: this.state.github,
          bitbucket: this.state.bitbucket
        })
        .then(() => {
          this.props.navigation.navigate("Profile");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  render() {
    let {
      formWrapper,
      nameWrapper,
      horizontalRowWrapper,
      horizontalElementWrapper
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
        <ScrollView
          style={styles.container}
          // behavior="padding"
        >
          <Container>
            <Header
              title={"Profile"}
              openDrawer={() => {
                try {
                  this.props.navigation.openDrawer();
                } catch (e) {}
              }}
              rightButton={
                <TouchableOpacity onPress={this.saveUserData}>
                  <Text style={styles.rightButtonText}>Save</Text>
                </TouchableOpacity>
              }
            />
            <View style={formWrapper}>
              <View style={horizontalRowWrapper}>
                <View
                  style={[
                    horizontalElementWrapper,
                    {
                      marginRight: 15
                    }
                  ]}
                >
                  <CustomeTextInput
                    value={firstName}
                    onChangeText={text => this.inputText("firstName", text)}
                    placeholder={"First name"}
                    imageSrc={require("../../../images/useer.png")}
                    isRequire={true}
                  />
                </View>
                <View style={horizontalElementWrapper}>
                  <CustomeTextInput
                    value={lastName}
                    onChangeText={text => this.inputText("lastName", text)}
                    placeholder={"Last name"}
                    isRequire={true}
                  />
                </View>
              </View>
              <CustomeTextInput
                value={email}
                onChangeText={text => this.inputText("email", text)}
                placeholder={"Email"}
                imageSrc={require("../../../images/email.png")}
              />
              <CustomeTextInput
                value={skype}
                onChangeText={text => this.inputText("skype", text)}
                placeholder={"Skype"}
                imageSrc={require("../../../images/skype.png")}
                isRequire={true}
              />
              <View style={horizontalRowWrapper}>
                <View
                  style={[
                    horizontalElementWrapper,
                    {
                      marginRight: 15
                    }
                  ]}
                >
                  <CustomeTextInput
                    value={title}
                    onChangeText={text => this.inputText("title", text)}
                    placeholder={"Title"}
                    imageSrc={require("../../../images/useer.png")}
                  />
                </View>
                <View style={horizontalElementWrapper}>
                  <CustomeTextInput
                    keyboardType={"phone-pad"}
                    value={phone}
                    onChangeText={text => this.inputText("phone", text)}
                    placeholder={"Phone"}
                    imageSrc={require("../../../images/phone.png")}
                  />
                </View>
              </View>
              <CustomeTextInput
                value={github}
                onChangeText={text => this.inputText("github", text)}
                placeholder={"Github username or email"}
                imageSrc={require("../../../images/git.png")}
              />
              <CustomeTextInput
                value={bitbucket}
                onChangeText={text => this.inputText("bitbucket", text)}
                placeholder={"Bitbucket username or email"}
                imageSrc={require("../../../images/bitbacket.png")}
              />
            </View>
          </Container>
        </ScrollView>
      );
    }
  }
}

export default EditProfile;
