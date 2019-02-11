import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts, DefaultStyles } from "../../../constants";

const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const { header } = DefaultStyles;

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
    nameText: {
        color: Colors.fontGray,
        fontFamily: Fonts.FuturaBook,
        fontSize: 20
    },
    animatedContainer: {
        marginVertical: 5,
        paddingHorizontal: 15,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transform: [{translateX: this.translateX}]
    },
    itemStyle: {
        marginVertical: 5,
        paddingHorizontal: 15,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noProjectsText: {
        color: Colors.fontGray,
        fontFamily: Fonts.FuturaBook,
        fontSize: 28
    },
    rightButtonText: {
        color: Colors.seaWave,
        fontFamily: Fonts.FuturaBook,
        fontSize: 18
    },
});
