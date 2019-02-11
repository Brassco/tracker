import React , {Component} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import styles from './styles';
import {CustomeTextInput, Header, Container, ButtonDefault} from '../../common';
import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const usersRef = db.collection("users");


class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetch: false,
            newPassword: '',
            repeatPassword: '',
            currentPassword: '',
            user: firebase.auth().currentUser,
        };
    }

    inputText = (type, text) => {
        this.setState({
            [type]: text
        });
    };

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        const { currentPassword, newPassword, repeatPassword} = this.state;
        if (!newPassword || newPassword.length < 1) {
            alert("New Password is required field");
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            alert("Password must at least 6 characters");
            return;
        }
        if (!repeatPassword || repeatPassword.length < 1) {
            alert("Repeat Password is required field");
            return;
        }
        if (!repeatPassword || repeatPassword.length < 6) {
            alert("Repeat Password must at least 6 characters");
            return;
        }
        if (repeatPassword !== newPassword) {
            alert("Repeat password doesn't mutch password");
            return;
        }
        this.setState({
            fetch: true
        })
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                alert('Your password was successful changed')
                this.props.navigation.navigate("Profile");
            }).catch(
                (error) => {
                    this.setState({
                        fetch: false
                    })
                    alert(error);
            });
        }).catch(
            (error) => {
                alert(error)
                this.setState({
                    fetch: false
                })
        });
    }

    render() {
        let {formWrapper, buttonWrapper} = styles;
        if (this.state.user == null) {
            return <ActivityIndicator />
        } else {
            const { currentPassword, newPassword, repeatPassword} = this.state;
            return(
                <ScrollView
                    style={styles.container}
                    // behavior="padding"
                >
                    <Container>
                        <Header
                            title={'Change password'}
                            openDrawer={() => this.props.navigation.openDrawer()}

                        />
                        <View
                            style={
                                formWrapper}
                        >
                            <CustomeTextInput
                                secure={true}
                                value={currentPassword}
                                onChangeText={text => this.inputText("currentPassword", text)}
                                placeholder={'Current Password'}
                                imageSrc={require('../../../assets/images/xxxhdpi/useer.png')}
                                isRequire={true}
                            />
                            <CustomeTextInput
                                secure={true}
                                value={newPassword}
                                onChangeText={text => this.inputText("newPassword", text)}
                                placeholder={'New Password'}
                                imageSrc={require('../../../assets/images/xxxhdpi/useer.png')}
                                isRequire={true}
                            />
                            <CustomeTextInput
                                secure={true}
                                value={repeatPassword}
                                onChangeText={text => this.inputText("repeatPassword", text)}
                                placeholder={'Repeat password'}
                                imageSrc={require('../../../images/useer.png')}
                                isRequire={true}
                            />
                            <ButtonDefault
                                fetching={this.state.fetch}
                                onPress={this.changePassword}
                            >
                                Change password
                            </ButtonDefault>
                        </View>
                    </Container>
                </ScrollView>
            )
        }
    }
}

export default ChangePassword;