import React, { Component } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Layout, Colors, DefaultStyles, User, Func } from "../../constants";
import { Icon } from "react-native-elements";
import {
  DateItem,
  HEADER,
  ProjectsItem,
  TaskTitleList,
  TaskTitleString
} from "./Components";
import styles from "./styles";
import { DateTime } from "luxon";

import firebase from "react-native-firebase";
const db = firebase.firestore();
const projectsRef = db.collection("projects");

function deleteReport(pid, rid, nav) {
  Alert.alert(
    "Forewarn:",
    "Report will be deleted!",
    [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          projectsRef
            .doc(pid)
            .collection("reports")
            .doc(rid)
            .delete()
            .then(() => {
              nav.goBack();
            });
        }
      }
    ],
    { cancelable: false }
  );
}

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam("item"),
      user: { ...User.getUserObj() }
    };
  }

  static getDerivedStateFromProps(props, state) {
    const item = props.navigation.getParam("item");
    return { ...state, item };
  }

  render() {
    const { item, user } = this.state;
    const goBack = () => this.props.navigation.goBack();
    const goEditReport = () =>
      this.props.navigation.push("EditReport", {
        item: item
      });

    return (
      <View style={[DefaultStyles.container, styles.topView]}>
        <HEADER
          goBack={() => Func.noDoublePress(goBack)}
          goEditReport={() => Func.noDoublePress(goEditReport)}
          isOwner={user.uid == item.uid}
          title="Report"
        />
        <ProjectsItem title={item.title} />
        <DateItem date={item.date} />
        <TaskTitleString time={item.totlaTime} />
        <TaskTitleList tasks={item.tasks} extraData={this.state} />
        {user.uid == item.uid && (
          <TouchableOpacity
            style={styles.buttonWhite}
            onPress={() =>
              deleteReport(item.pid, item.rid, this.props.navigation)
            }
          >
            <Text style={styles.buttonGreenText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
