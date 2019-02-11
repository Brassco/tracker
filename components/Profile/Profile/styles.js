import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../../constants";

const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const { header } = DefaultStyles;

export default StyleSheet.create({
    titleContainer: {
        height: 100,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 22
    },
    nameText: {
        color: Colors.fontGray,
        fontFamily: Fonts.FuturaBook,
        fontSize: 20
    },
    titleText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 25
    },
    subTitle: {
        color: Colors.midGray,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
    buttonWrapper: {
        width: '90%',
    },
    descriptionTextWrapper: {
        marginHorizontal: 10
    },
    descriptionText: {
        color: Colors.black,
        fontFamily: Fonts.FuturaBook,
        fontSize: 16,
        textAlign: 'center'
    },
    rightButtonText: {
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
});
