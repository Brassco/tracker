import React, {Component} from 'react';
import {View, Image, Text, Animated, TouchableOpacity, PanResponder} from 'react-native';
import styles from "../styles";
import {Layout, Colors} from '../../../../constants';
import { Icon } from "react-native-elements";

class AnimatedListItem extends React.Component {

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
            if (dx < 0) {
                if (Math.abs(dx) >= 0.15 * screenWidth) {
                    Animated.timing(this.translateX, {
                        toValue: dx <= -50 ? -50 : 0,
                        duration: 200
                    }).start(
                        this.setState({
                            showDeleteButton: true
                        })
                    );
                } else {
                    Animated.spring(this.translateX, {
                        toValue: 0,
                        bounciness: 10
                    }).start();
                }
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

            if (-5 <= dx && dx <= 5) {
                this.props.onPress()
            }
        }
    });

    onDelete() {
        this.setState({
            showDeleteButton: false
        })
        this.props.onDelete();
    }

    renderCounter() {
        return (
            <View style={{
                width: '20%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require('../../../../assets/images/xxxhdpi/people_black.png')}
                    />
                </View>
                <View style={styles.imageWrapper}>
                    <Text style={styles.counterText}>
                        {this.props.counter}
                    </Text>
                </View>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../../../../assets/images/xxxhdpi/arrow_right_2.png')}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <Animated.View
                    style={[
                        styles.itemStyle,
                        {transform: [{translateX: this.translateX}]}
                    ]}
                    {...this._panResponder.panHandlers}
                >
                    <View
                        style={{
                            width: '75%',
                        }}
                    >
                        <Text style={styles.emailText}>
                            {this.props.title}
                        </Text>
                    </View>
                    {
                        this.renderCounter()
                    }
                </Animated.View>
                {
                    this.state.showDeleteButton &&
                    <View style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: this.state.showDeleteButton ? 'absolute' : 'relative',
                        right: 15
                    }}>
                        <Icon
                            name="md-close"
                            type="ionicon"
                            size={34}
                            color={Colors.seaWave}
                            onPress={this.onDelete}
                            underlayColor={Colors.lightGray}
                        />
                    </View>
                }
            </View>
        )
    }
}

export default AnimatedListItem;