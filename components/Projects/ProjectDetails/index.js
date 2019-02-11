import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header } from "../../common";
import styles from "./styles";
import ListItem from "./Components/ListItem";
import firebase from "react-native-firebase";
import { DateTime } from "luxon";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const usersRef = db.collection("users");
const projectsRef = db.collection("projects");

export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectUid: null,
      project: null,
      isOwner: false,
      user: firebase.auth().currentUser
    };
  }

  componentDidMount() {
    let project = this.props.navigation.getParam("project");
    project.team.map(member => {
      if (member.email == this.state.user.email) {
        this.setState({
          isOwner: true
        });
      }
    });
  }

  onEditProject = () => {
    let project = this.props.navigation.getParam("project");
    let uid = this.props.navigation.getParam("uid");
    this.props.navigation.navigate("EditProject", { uid, project });
  };

  openTeamMemberDetails(memberData) {
    this.props.navigation.navigate("TeamMember", { member: memberData });
  }

    renderRightButton() {
        let project = this.props.navigation.getParam('project');
        if (this.state.user.uid == project.isOwner) {
            return (
                <TouchableOpacity
                    onPress={this.onEditProject}
                >
                    <Text style={styles.rightButtonText}>
                        Edit
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <View>

            </View>
        )
    }

    render() {
        let project = this.props.navigation.getParam('project');

        let date = DateTime.fromMillis(project.lastActivity.getTime())
            .setLocale("en")
            .toLocaleString();
        return (
            <Container>
                <Header
                    title={project.Title}
                    onBackPress={() => this.props.navigation.goBack()}
                    rightButton={
                        this.renderRightButton()
                    }
                />
                <View style={styles.container}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            {project.Description}
                        </Text>
                    </View>
                    <View style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            last activity
                        </Text>
                        <Text style={styles.dateText}>
                            {
                                date
                            }
                        </Text>
                    </View>
                    <View style={styles.teamContainerHeader}>
                        <Text style={styles.teamHeaderText}> Team </Text>
                        <Text style={styles.teamHeaderText}>
                            {project.team.length}
                        </Text>
                    </View>
                    <View style={{alignSelf: 'stretch'}}>
                        <ScrollView
                            containerStyle={styles.listContainer}
                        >
                            {
                                project.team.map((member) => (
                                    <ListItem
                                        onPress={() => this.openTeamMemberDetails(member)}
                                        isOwner={member.isOwner}
                                        key={member.email}
                                        name={member.name}
                                        email={member.email}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </Container>
        );
    }
}
