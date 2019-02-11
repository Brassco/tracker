import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { Layout, Colors, DefaultStyles, User } from "../../constants";
import { Icon } from "react-native-elements";
import {
  DateItem,
  DateSelector,
  HEADER,
  ProjectNameSelector,
  ProjectsItem,
  TaskInputItem,
  TaskTitleList,
  TaskTitleString
} from "./Components";
import styles from "./styles";
import { DateTime } from "luxon";

import firebase from "react-native-firebase";
const db = firebase.firestore();
const projectsRef = db.collection("projects");
const reportsRef = db.collection("reports");
const usersRef = db.collection("users");

export default class NewReport extends Component {
  constructor(props) {
    super(props);
    this.inputRefs;
    this.state = {
      date: new Date(),
      report: [],
      projectList: [],
      selectedProject: null,
      showDatePicker: false,
      showProjectList: false,
      closeInputItem: false,
      user: { ...User.getUserObj() }
    };
  }

  async recordReport() {
    const { report, selectedProject, user, date } = this.state;
    const self = this;

    if (!selectedProject) {
      alert("Did not select the project!");
      return;
    }
    if (!user || !user.email) return;
    const dateSetting = `${DateTime.fromMillis(date.getTime()).toFormat(
      "yyyy.LL.dd"
    )}-${user.email}`;
    const REPORTDATE = parseInt(date.getTime());
    projectsRef
      .doc(selectedProject.pid)
      .collection("reports")
      .doc(dateSetting)
      .set({
        tasks: [...report],
        totlaTime: this._getTotalTime(),
        uid: user.uid,
        userDisplayName: !!user.displayName ? user.displayName : user.email,
        pid: selectedProject.pid,
        date: new Date(REPORTDATE)
      });

    projectsRef
      .doc(selectedProject.pid)
      .collection("reports")
      .doc(dateSetting)
      .onSnapshot(
        {
          includeMetadataChanges: true
        },
        function(doc) {
          if (!doc.metadata.hasPendingWrites) {
            self.setState({
              report: [],
              selectedProject: null,
              showDatePicker: false,
              showProjectList: false,
              date: new Date()
            });
            alert("Your information successfully added to the database");
          }
        }
      );
  }

  componentDidMount() {
    const { user, showDatePicker, showProjectList } = this.state;
    this.unsubscriber = projectsRef.onSnapshot(querySnapshot => {
      const projectList = [];
      querySnapshot.forEach(doc => {
        const pid = doc.ref.id;
        if (doc.data().team.some(obj => obj.email == user.email))
          projectList.push({
            name: doc.data().Title,
            pid: pid
          });
      });
      projectList.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      this.setState({ projectList });
    });
  }
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  _closeItems = () => {
    this.setState({
      showDatePicker: false,
      showProjectList: false
    });
  };
  _pressProjectItem = () => {
    const showProjectList = !this.state.showProjectList;
    this.setState({
      showProjectList,
      showDatePicker: false
    });
  };
  _pressDatePickerItem = () => {
    const showDatePicker = !this.state.showDatePicker;
    this.setState({
      showProjectList: false,
      showDatePicker
    });
  };
  _sumTime = () => {
    if (!this.state.report || this.state.report.length == 0)
      return { hours: 0, minutes: 0 };
    return this.state.report.reduce(function(previousValue, currentValue) {
      const totalMinutes =
        parseInt(previousValue.minutes) + parseInt(currentValue.minutes);
      const totalHours = Math.floor(
        parseInt(previousValue.hours) +
          parseInt(currentValue.hours) +
          totalMinutes / 60
      );
      return { hours: totalHours, minutes: totalMinutes % 60 };
    });
  };
  _getTotalTime = () => {
    const { hours, minutes } = this._sumTime();
    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${h}:${m}`;
  };
  _addTask = task => {
    let report = [...this.state.report];
    report.push(task);
    this.setState({ report });
  };
  _renderItemProject = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        this.setState({
          selectedProject: item,
          showProjectList: false
        })
      }
      style={[
        styles.renderItemProjectView,
        {
          backgroundColor: index % 2 > 0 ? Colors.fontGray50 : Colors.fontGray10
        }
      ]}
    >
      <Text style={styles.renderItemProjectText}>{item.name}</Text>
    </TouchableOpacity>
  );
  _deleteTask = index => {
    let { report } = this.state;
    report.splice(index, 1);
    this.setState({ report });
  };

  render() {
    const {
      changedTime,
      closeInputItem,
      date,
      description,
      projectList,
      report,
      selectedProject,
      showDatePicker,
      showProjectList
    } = this.state;
    const totalTime = this._getTotalTime();
    return (
      <View style={[DefaultStyles.container, styles.topView]}>
        <HEADER
          nav={this.props.navigation}
          saveReportCBFunc={() => this.recordReport()}
        />
        <ProjectsItem
          onPress={this._pressProjectItem}
          showItem={showProjectList}
          selected={selectedProject}
        />
        <ProjectNameSelector
          showItem={showProjectList}
          list={projectList}
          extraData={this.state}
          renderItem={this._renderItemProject}
        />
        <DateItem
          changedTime={changedTime}
          onPress={this._pressDatePickerItem}
          showItem={showDatePicker}
          selected={selectedProject}
          date={date}
        />
        <DateSelector
          date={date}
          showItem={showDatePicker}
          onDateChange={date =>
            this.setState({ date, changedTime: Date.now().toString() })
          }
        />
        <TaskInputItem
          addTask={task => this._addTask(task)}
          onBlur={showProjectList || showDatePicker}
          closeFunc={this._closeItems}
        />
        <TaskTitleString time={totalTime} />
        <TaskTitleList
          tasks={report}
          extraData={this.state}
          deleteTask={index => this._deleteTask(index)}
        />
      </View>
    );
  }
}
