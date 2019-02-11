import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from "../styles";

const ListItem = (props) => {

    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <View
                style={styles.itemStyle}
            >
                <TouchableOpacity
                    onPress={props.onPress}
                    style={{
                        width: '75%',
                    }}
                >
                    <Text style={styles.emailText}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
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
                            {props.counter}
                        </Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            source={require('../../../../assets/images/xxxhdpi/arrow_right_2.png')}
                        />
                    </View>
                </View>
            </View>
        </View>
    )

}

export default ListItem;