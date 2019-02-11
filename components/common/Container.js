import React from 'react';
import {View, Dimensions} from 'react-native';
import { Layout, Colors, Fonts } from "../../constants";
const ifIphoneX = Layout.ifIphoneX;

let {width, height} = Dimensions.get('window');

const Container = (props) => {
    return (
        <View style={{
            flex: 1,
            width: "100%",
            height: "100%",
            paddingHorizontal: 0,
            alignItems: "center",
            justifyContent: "flex-start",
            ...ifIphoneX(
                {
                    paddingTop: 35
                },
                {
                    paddingTop: 20
                }
            )
        }}
        >
            {
                props.children
            }
        </View>
    )
}

export {Container};