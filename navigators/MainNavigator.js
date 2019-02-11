/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { createStackNavigator } from "react-navigation";

import { View, Modal } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../constants";
import firebase from "react-native-firebase";
import type {
  RemoteMessage,
  Notification,
  NotificationOpen
} from "react-native-firebase";

import {
  Activity,
  EditReport,
  NewReport,
  Report,
  People,
  Projects,
  Personal,
  ProjectDetails,
  AddProject,
  EditProject,
  Profile,
  EditProfile,
  TimeTracker,
  ChangePassword,
  TeamMember
} from "../components";
import ModalComponent from "../components/ModalComponent";

const MainNavigatorTemp = createStackNavigator(
  {
    Activity: {
      screen: Activity,
      navigationOptions: { header: null }
    },
    EditReport: {
      screen: EditReport,
      navigationOptions: { header: null }
    },
    NewReport: {
      screen: NewReport,
      navigationOptions: { header: null }
    },
    Report: {
      screen: Report,
      navigationOptions: { header: null }
    },
    Personal: {
      screen: Personal,
      navigationOptions: { header: null }
    },
    People: {
      screen: People,
      navigationOptions: { header: null }
    },
    Projects: {
      screen: Projects,
      navigationOptions: { header: null }
    },
    Details: {
      screen: ProjectDetails,
      navigationOptions: { header: null }
    },
    AddProject: {
      screen: AddProject,
      navigationOptions: { header: null }
    },
    EditProject: {
      screen: EditProject,
      navigationOptions: { header: null }
    },
    Profile: {
      screen: Profile,
      navigationOptions: { header: null }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: { header: null }
    },
    TimeTracker: {
      screen: TimeTracker,
      navigationOptions: { header: null }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: { header: null }
    },
    TeamMember: {
      screen: TeamMember,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: "Activity"
  }
);

class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      titlePush: '"Мой первый проект ;)"',
      textPush: "You were invited in the project"
    };
  }
  static router = MainNavigatorTemp.router;

  componentDidMount() {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        this.whiteNotification(notification, "notificationListener");
      });
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  whiteNotification = (notification, src) => {
    let textPush = !!notification._body ? notification._body : false;
    if (~textPush.indexOf("removed")) {
      textPush = "You were invited in the project:";
    } else {
      textPush = "You've been removed from the project:";
    }
    const titlePush = !!notification._title ? notification._title : false;
    this.getShowModal(titlePush, textPush);
  };

  getShowModal = (titlePush = false, textPush = false) => {
    this.setState({ showModal: true, titlePush, textPush });
    setTimeout(() => {
      this.setState({
        showModal: false
      });
    }, 5000);
  };

  render() {
    const { showModal, textPush, titlePush } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType={"fade"}
          transparent
          visible={showModal}
          onRequestClose={() => this.getShowModal()}
        >
          <ModalComponent text={textPush} title={titlePush} />
        </Modal>
        <MainNavigatorTemp navigation={this.props.navigation} />
      </View>
    );
  }
}
export default MainNavigator;
