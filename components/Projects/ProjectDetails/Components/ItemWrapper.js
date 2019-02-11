import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const ItemWrapper = (props) => {
    if (!props.onPress) {
        return (
            <View
                style={{
                    height: 50,
                    width: '100%',
                    marginVertical: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                {
                    props.children
                }
            </View>
        )
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                height: 50,
                width: '100%',
                marginVertical: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row'
            }}
        >
            {
                props.children
            }
        </TouchableOpacity>
    )
}

export default ItemWrapper;