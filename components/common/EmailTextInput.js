import React, { Component } from "react";
import { View, Text, TextInput, Image, Keyboard } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../constants";
const defIcon = require("../../assets/images/xxxhdpi/warning_red.png");

let {width, height} = Layout.window;

class EmailTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    endEdit = () => {
        Keyboard.dismiss();
    };

    render() {
        const { imageSrc = defIcon, isRequire, placeholder } = this.props;
        // const { value } = this.state.value != "" ? this.state : this.props;
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
                    autoCapitalize = 'none'
                    style={[inputView, inputText]}
                    placeholder={placeholderStr}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={Colors.fontGray}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    onBlur={this.endEdit}
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
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: Colors.fontGray,
    },
    image: {
        width: "60%",
        marginTop: -5
    },
    iconView: {
        width: width*0.15,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    inputView: {
        width: "85%",
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

export {EmailTextInput}