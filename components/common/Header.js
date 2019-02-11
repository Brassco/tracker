import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Layout, Colors, DefaultStyles, Fonts } from "../../constants";
import { Icon } from "react-native-elements";

const { width, height } = Layout.window;

const Header = (props) => {
    return (
        <View style={styles.headerView}>
            {
                props.onBackPress ?
                    <TouchableOpacity
                        style={styles.leftHeaderView}
                        onPress={props.onBackPress}
                    >
                        <Image
                            style={styles.goBackButtonImg}
                            source={require("../../assets/images/xxxhdpi/btn_back_transparent.png")}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    :
                    <View style={styles.leftHeaderView}>
                        <Icon
                            name="menu"
                            size={34}
                            color={Colors.seaWave}
                            onPress={props.openDrawer}
                            underlayColor={Colors.lightGray}
                        />
                    </View>
            }
            <View style={styles.titleHeaderView}>
                <Text style={DefaultStyles.headerTitle}>

                    { ((props.title).length > 15) ?
                        (((props.title).substring(0,14)) + '...') :
                        props.title }
                </Text>
            </View>

            <View style={styles.rightHeaderView}>
                {
                    props.rightButton
                }
            </View>
        </View>
    )
}

const styles = {
    headerView: {
        height: 40,
        flexDirection: "row"
    },
    clockView: {
        height: 80,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    leftHeaderView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleHeaderView: {
        flex: 3,
        padding: 0,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    rightHeaderView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    goBackButtonImg: {
        marginTop: 7,
        // marginLeft: 10,
        width: 46,
        height: 46
    }
}

export {Header};