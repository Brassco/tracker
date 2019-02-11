import React, { Component } from "react";
import { View, Text, TextInput, Image, Keyboard } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../constants";
const defIcon = require("../../assets/images/xxxhdpi/warning_red.png");

let {width, height} = Layout.window;

class CustomeTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }
    onChangeText(text) {
        let value;
        if (!this.props.secure)
            value = text.replace(/[^0-9a-zA-Z@\._А-Яа-я ]/, "").trim();
        else value = text.trim();
        this.setState({ value });
    }

    endEdit = () => {
        Keyboard.dismiss();
    };

    render() {
        const { secure = false, imageSrc = defIcon, isRequire, placeholder, keyboardType = 'default' } = this.props;
        let {container, iconView, inputText, inputView, image} = styles;
        let placeholderStr = isRequire ? placeholder+" *" : placeholder;
        return (
            <View style={container}>
                {this.props.imageSrc &&
                    <View style={iconView}>
                        <Image source={imageSrc} style={image} resizeMode="contain"/>
                    </View>
                }
                <TextInput
                    keyboardType={keyboardType}
                    style={[inputView, inputText, this.props.inputStyles]}
                    placeholder={placeholderStr}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={Colors.fontGray}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={!!secure}
                    value={this.props.value}
                    onBlur={() => this.endEdit()}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderColor: Colors.fontGray,
    },
    image: {
        width: "60%",
        marginTop: -5
    },
    iconView: {
        width: width*0.11,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    inputView: {
        width: "99%",
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    inputText: {
        color: Colors.black,
        textAlign: "left",
        fontFamily: Fonts.FuturaBook,
        fontSize: 20
    }
}

export {CustomeTextInput}