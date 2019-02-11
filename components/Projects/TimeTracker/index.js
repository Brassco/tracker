import React, { Component } from "react";
import { FlatList, ImageBackground, Modal, Text, View } from "react-native";
import { Layout, Colors, DefaultStyles, User } from "../../../constants";
import { Icon } from "react-native-elements";
import { Calendar, ModalMenu, TimePeriodView, ReportsList } from "./Components";
import styles from "./styles";
import {Header} from '../../common';
import { DateTime } from "luxon";
import firebase from "react-native-firebase";

const db = firebase.firestore();
const projectsRef = db.collection("projects");

export default class TimeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            result: {},
            clock: null,
            selectedStartDate: null,
            selectedEndedDate: null,
            selectedMode: "day",
            arrayReports: []
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidUpdate(prevPropv, prevState) {
        if (
            prevState.result != this.state.result ||
            prevState.selectedStartDate != this.state.selectedStartDate ||
            prevState.selectedEndedDate != this.state.selectedEndedDate
        ) {
            const selectedStartDate = !!this.state.result.startDate
                ? this.state.result.startDate
                : this.state.selectedStartDate;
            const selectedEndedDate = !!this.state.result.endDate
                ? this.state.result.endDate
                : this.state.selectedEndedDate;
            const selectedMode = !!this.state.result.mode
                ? this.state.result.mode
                : this.state.selectedMode;

            this.setState({
                selectedStartDate: selectedStartDate,
                selectedEndedDate: selectedEndedDate,
                selectedMode: selectedMode,
                arrayReports: []
            });

            this.listenDatabase();
        }
    }
    componentDidMount() {
        this.setState({ clock: DateTime.local() });
        if (!this.timer)
            this.timer = setInterval(() => {
                this.setState({ clock: DateTime.local() });
            }, 10000);

        this.listenDatabase();
    }
    componentWillUnmount() {
        if (!!this.time) clearInterval(this.timer);
        if (this.unsubscriber) this.unsubscriber();
        this.reportsRefs.forEach(unsubscriber => {
            if (!!unsubscriber) unsubscriber();
        });
    }
    listenDatabase() {

        if (!!this.unsubscriber) this.unsubscriber();
        if (!!this.reportsRefs)
            this.reportsRefs.forEach(unsubscriber => {
                if (!!unsubscriber) unsubscriber();
            });
        this.reportsRefs = [];
        const self = this;
        let project = this.props.navigation.getParam('project');
        let uid = this.props.navigation.getParam('uid');
        this.unsubscriber = projectsRef.doc(uid).onSnapshot(function(querySnapshot) {
            const title = querySnapshot.data().Title;
            const reportsRef = querySnapshot.ref.collection("reports");
            self.reportsRefs.push(
                reportsRef.onSnapshot(function(snapshot) {
                    snapshot.forEach(doc => {
                        const report = {
                            date: false,
                            ...doc.data(),
                            title,
                            rid: doc.ref.id
                        };

                        let {
                            arrayReports,
                            selectedStartDate: start,
                            selectedEndedDate: end,
                            selectedMode: mode
                        } = self.state;
                        if (!mode || mode == "period") mode = "day";
                        if (!start) start = DateTime.local();
                        if (!end) end = DateTime.local();
                        if (!!report.date) {
                            const dataReport = DateTime.fromMillis(report.date.getTime());

                            if (
                                start.startOf(mode) <= dataReport &&
                                dataReport <= end.endOf(mode)
                            ) {
                                const arrTemp = arrayReports;
                                // const arrTemp = arrayReports.filter(i => i.pid != report.pid);
                                arrTemp.push(report);
                                self.setState({ arrayReports: arrTemp });
                            }
                        }
                    });
                })
            );
        });
    }

    openDetails(uid, project) {
        this.props.navigation.navigate('Details', {uid,project});
    }

    render() {
        const { result, clock, arrayReports, selectedMode } = this.state;
        let project = this.props.navigation.getParam('project');
        let uid = this.props.navigation.getParam('uid');
        return (
            <View style={DefaultStyles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                >
                    <ModalMenu
                        getResultDate={result => this.setState({ result })}
                        closeModal={() => this.setState({ modalVisible: false })}
                    />
                </Modal>
                <ImageBackground
                    style={styles.topView}
                    source={require("../../../assets/images/fon.png")}
                    resizeMode="cover"
                >
                    <Header
                        title={project.Title}
                        onBackPress={() => this.props.navigation.goBack()}
                        rightButton={
                            <Icon
                                name="md-settings"
                                type="ionicon"
                                size={34}
                                color={Colors.seaWave}
                                onPress={() => this.openDetails(uid, project)}
                                underlayColor={Colors.lightGray}
                            />
                        }
                    />
                    <View style={styles.clockView}>
                        <Text style={DefaultStyles.clockText}>
                            {!!clock && `${clock.toFormat("HH")}:${clock.toFormat("mm")}`}
                        </Text>
                    </View>
                </ImageBackground>

                {/* Reports List */}
                <ReportsList data={[...arrayReports]} mode={selectedMode} />

                {!!result && result.mode != "period" ? (
                    <Calendar
                        data={result}
                        cbSelector={selecedDatePeriod =>
                            this.setState({
                                selectedStartDate: selecedDatePeriod.start,
                                selectedEndedDate: selecedDatePeriod.end
                            })
                        }
                        cbSearchButton={() => this.setState({ modalVisible: true })}
                    />
                ) : (
                    <TimePeriodView
                        data={result}
                        cbSearchButton={() => this.setState({ modalVisible: true })}
                    />
                )}
            </View>
        );
    }
}
