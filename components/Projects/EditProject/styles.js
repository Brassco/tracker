import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../../constants";

const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const { header } = DefaultStyles;

const ITEM_HEIGHT = 60;
const fontSize = 16;

export default StyleSheet.create({
  counterText: {
    color: '#111'
  },
  listContainer: {
    width: '100%'
  },
  image: {
    width: 20,
    height: 20,
  },
  imageWrapper: {
    // backgroundColor: '#756',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    borderTopWidth: 0,
    height: 50,
    alignItems: 'center',
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
    teamHeaderText: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18,
        fontWeight: '500'
    },
    alignContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 32
    },
    isOwnerText: {
        marginHorizontal: 5,
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 20
    },
    rightButtonText: {
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
});
