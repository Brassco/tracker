import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
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

export default class EditReport extends Component {
  constructor(props) {
    super(props);
    const item = props.navigation.getParam("item");

    this.state = {
      item: item,
      date: item.date,
      letSaveTask: false,
      report: [...item.tasks],
      projectList: [item.title],
      selectedProject: {
        pid: item.pid,
        name: item.title,
        rid: item.rid
      },
      showDatePicker: false,
      showProjectList: false,
      senseToSaveData: false,
      keyboardShow: false,
      user: { ...User.getUserObj() }
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.state.senseToSaveData &&
      JSON.stringify(this.state.report) != JSON.stringify(prevState.report)
    ) {
      this.setState({ senseToSaveData: true });
    }
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
    const REPORT = {
      title: selectedProject.name,
      tasks: [...report],
      totlaTime: this._getTotalTime(),
      uid: user.uid,
      userDisplayName: !!user.displayName ? user.displayName : user.email,
      pid: selectedProject.pid,
      date: new Date(REPORTDATE)
    };
    projectsRef
      .doc(selectedProject.pid)
      .collection("reports")
      .doc(dateSetting)
      .set(REPORT);

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
            self.setState({ senseToSaveData: false });
            setTimeout(
              () => self.props.navigation.navigate("Report", { item: REPORT }),
              0
            );
          }
        }
      );
  }

  componentDidMount() {
    const { user } = this.state;

    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this._keyboardDidShow()
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this._keyboardDidHide()
    );

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
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
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
  _saveTask = (task, index) => {
    let report = [...this.state.report];
    report.splice(index, 1, task);
    this.setState({ report, resetKeyTaskTitleList: Date.now() });
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
    this.setState({ report, resetKeyTaskTitleList: Date.now() });
  };
  _delAllTasksFunc = () => {
    this.setState({ report: [], resetKeyTaskTitleList: Date.now() });
  };
  _keyboardDidShow = () => {
    this.setState({ keyboardShow: true });
  };
  _keyboardDidHide = () => {
    this.setState({ keyboardShow: false });
  };

  render() {
    const {
      changedTime,
      date,
      description,
      keyboardShow,
      letSaveTask,
      projectList,
      report,
      resetKeyTaskTitleList,
      selectedProject,
      senseToSaveData,
      showDatePicker,
      showProjectList
    } = this.state;
    const totalTime = this._getTotalTime();

    return (
      <View style={[DefaultStyles.container, styles.topView]}>
        <HEADER
          disabled={!senseToSaveData}
          title={"Edit Report"}
          textRightButton={"Save"}
          nav={this.props.navigation}
          saveReportCBFunc={() => this.recordReport()}
        />
        {!keyboardShow && (
          <ProjectsItem
            onPress={this._pressProjectItem}
            showItem={showProjectList}
            selected={selectedProject}
          />
        )}
        <ProjectNameSelector
          showItem={showProjectList}
          list={projectList}
          extraData={this.state}
          renderItem={this._renderItemProject}
        />
        {!keyboardShow && (
          <DateItem
            changedTime={changedTime}
            onPress={this._pressDatePickerItem}
            showItem={showDatePicker}
            selected={selectedProject}
            date={date}
          />
        )}
        <DateSelector
          date={date}
          showItem={showDatePicker}
          onDateChange={date =>
            this.setState({ date, changedTime: Date.now().toString() })
          }
        />
        <TaskInputItem addTask={task => this._addTask(task)} />
        <TaskTitleString
          time={totalTime}
          delTasks={() => this._delAllTasksFunc()}
        />
        <TaskTitleList
          key={resetKeyTaskTitleList}
          tasks={report}
          saveTask={(task, index) => this._saveTask(task, index)}
          deleteTask={index => this._deleteTask(index)}
        />
      </View>
    );
  }
}
