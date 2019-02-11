import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from "../styles";
import ItemWrapper from './ItemWrapper';

const ListItem = (props) => {
    return (
        <ItemWrapper onPress={props.name != '' ? props.onPress : false}>
            <View
                style={{
                    flex: 9
                }}
            >
                <Text style={styles.emailText}>
                    {props.email}
                </Text>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.nameText}>
                        {props.name}
                    </Text>
                    {
                        props.isOwner &&
                        <Text style={styles.isOwnerText}>
                            (owner)
                        </Text>
                    }
                </View>
            </View>
            <View style={{
                flex: 1
            }}>
                <Image
                    style={styles.arrowStyle}
                    resizeMode='contain'
                    source={require('../../../../assets/images/xxxhdpi/arrow_right_2.png')}
                />
            </View>
        </ItemWrapper>
    )
}

export default ListItem;