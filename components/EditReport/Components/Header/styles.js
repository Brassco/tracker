import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

const fontSize = 16;
const lineHeight = 30;

export default StyleSheet.create({
  headerView: {
    height: 40,
    flexDirection: "row"
  },
  leftHeaderView: {
    flex: 2,
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
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 2,
    paddingTop: Platform.OS == "ios" ? 7 : 5,
    paddingRight: 0
  },
  textRightButtonHeader: {
    color: Colors.fontGreen,
    textAlign: "right",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: lineHeight
  },
  goBackButtonImg: {
    marginTop: 7,
    marginLeft: -40,
    width: 46,
    height: 46
  }
});
