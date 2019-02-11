import React, { Component } from "react";
import { View, Text, StatusBar, Image, FlatList } from "react-native";
import styles from "./styles";
import { Container, Header } from "../../common";
import { Colors } from "../../../constants";
import ListItem from "./Components/ListItem";
import AnimatedListItem from "./Components/AnimatedListItem";
import { Icon } from "react-native-elements";
import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");
const projectsRef = db.collection("projects");

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      user: firebase.auth().currentUser
    };
    this.openDetails = this.openDetails.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
  }

  openDetails(uid, project) {
    this.props.navigation.navigate("TimeTracker", { uid, project });
  }

  componentDidMount() {
    this.unsubscriber = projectsRef.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = querySnapshot => {
    const projects = [];
    querySnapshot.forEach(doc => {
      let docData = doc.data();
      let filteredData = docData.team.filter(
        user => user.email == this.state.user.email
      );
      //get only user's projects
      if (filteredData.length > 0) {
        let data = {
          uid: doc.id,
          data: docData,
          isOwner: filteredData[0].isOwner
        };
        projects.push(data);
      }
    });
    this.setState({
      projects
    });
  };

  onDeleteProject = projectId => {
    projectsRef
      .doc(projectId)
      .delete()
      .then(function() {
        alert("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  renderItem = ({ item }) => {
    let { uid, data, isOwner } = item;
    if (item.data.isAdmin == this.state.user.uid) {
      return (
        <AnimatedListItem
          onPress={() => this.openDetails(uid, data)}
          onDelete={() => this.onDeleteProject(uid)}
          key={uid}
          title={data.Title}
          wrapperStyle={styles.listItemContainer}
          counter={data.team.length}
        />
      );
    }
    return (
      <ListItem
        onPress={() => this.openDetails(uid, data)}
        key={uid}
        title={data.Title}
        counter={data.team.length}
      />
    );
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          title={"Projects"}
          openDrawer={() => {
            try {
              this.props.navigation.openDrawer();
            } catch (e) {}
          }}
          rightButton={
            <Icon
              name="md-add"
              type="ionicon"
              size={34}
              color={Colors.seaWave}
              onPress={() => this.props.navigation.push("AddProject")}
              underlayColor={Colors.lightGray}
            />
          }
        />
        {this.state.projects.length > 0 ? (
          <FlatList
            style={styles.listContainer}
            data={this.state.projects}
            keyExtractor={(item, index) => item.uid}
            renderItem={this.renderItem}
          />
        ) : (
          <View>
            <Text style={styles.noProjectsText}>No projects yet</Text>
          </View>
        )}
      </Container>
    );
  }
}
