import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const { header } = DefaultStyles;

const ITEM_HEIGHT = 60;
const fontSize = 16;

export default StyleSheet.create({

    container: {
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    descriptionContainer: {
        marginVertical: 20,
        margin: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    descriptionText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 20
    },
    activityContainer: {
        margin: 5,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    activityText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18,
        fontWeight: '500'
    },
    dateText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 16,
        fontWeight: '500'
    },
    teamContainerHeader: {
        marginVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.fontMain,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    teamHeaderText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18,
        fontWeight: '500'
    },
    listContainer: {
        width: '100%',
    },
    emailText: {
        color: Colors.black,
        textAlign: "left",
        fontFamily: Fonts.FuturaBook,
        fontSize: fontSize,
        lineHeight: fontSize * 1.2
    },
    nameText: {
        color: Colors.fontGray,
        textAlign: "left",
        fontFamily: Fonts.FuturaBook,
        fontSize: fontSize * 0.9,
        lineHeight: fontSize * 1.2
    },
    isOwnerText: {
        marginHorizontal: 5,
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: fontSize * 0.9,
        lineHeight: fontSize * 1.2
    },
    rightButtonText: {
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
    arrowStyle: {
        width: 20,
        height: 20,
    }
});
