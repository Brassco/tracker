import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../../constants";

const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const { header } = DefaultStyles;

export default StyleSheet.create({
    formWrapper: {
        height: height-50,
        width: width*0.9,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    horizontalRowWrapper: {
        flexDirection: 'row'
    },
    horizontalElementWrapper: {
        flex: 1
    },
    rightButtonText: {
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
});
