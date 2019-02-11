import React from 'react';
import {View, Text, Animated, PanResponder, TouchableOpacity} from 'react-native';
import {Layout, Colors} from '../../../../constants';
import { Icon } from "react-native-elements";
import styles from "../styles";

class UserRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteButton: false
        }
        this.onDelete = this.onDelete.bind(this);
    }

    translateX = new Animated.Value(0);
    _panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
        onPanResponderRelease: (e, {vx, dx}) => {
            const screenWidth = Layout.window.width;
            //on swipe to left
            if (dx < 0 && Math.abs(dx) >= 0.15 * screenWidth) {
                Animated.timing(this.translateX, {
                    toValue: dx <= -50 ? -50 : 0,
                    duration: 200
                }).start(
                    this.setState({
                        showDeleteButton: true
                    })
                );
            }
            // on swipe to right hide Delete button
            if (dx >= 0 ) {
                this.setState({
                    showDeleteButton: false
                })
                Animated.spring(this.translateX, {
                    toValue: 0,
                    bounciness: 10
                }).start();
            }
        }
    });

    onDelete() {
        this.setState({
            showDeleteButton: false
        })
        this.props.onDelete(this.props.email);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Animated.View
                    style={{
                        marginVertical: 10,
                        paddingLeft: 10,
                        height: 50,
                        width: '80%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        transform: [{translateX: this.translateX}]
                    }}
                    {...this._panResponder.panHandlers}
                >
                    <Text style={styles.emailText}>
                        {
                            this.props.email
                        }
                    </Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.nameText}>
                            {
                                this.props.name
                            }
                        </Text>
                        {
                            this.props.isOwner &&
                            <Text style={styles.isOwnerText}>
                                (owner)
                            </Text>
                        }
                    </View>
                </Animated.View>
                {
                    this.state.showDeleteButton &&
                    <Icon
                        name="md-close"
                        type="ionicon"
                        size={34}
                        color={Colors.seaWave}
                        onPress={this.onDelete}
                        underlayColor={Colors.lightGray}
                    />
                }
            </View>
        )
    }
}

export default UserRow;