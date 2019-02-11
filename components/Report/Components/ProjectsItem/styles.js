import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

const fontSize = 16;
const lineHeight = 30;

export default StyleSheet.create({
  formListItem: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    padding: 0,
    borderColor: Colors.fontGray,
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1
  },
  iconArrowView: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30
  },
  itemTitleView: {
    paddingBottom: 5
  },
  text: {
    paddingLeft: 10,
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: Platform.OS == "ios" ? 0 : lineHeight
  }
});
