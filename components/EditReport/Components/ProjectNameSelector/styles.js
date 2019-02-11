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
    justifyContent: "space-between"
  },
  formListItemSelect: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 5,
    backgroundColor: Colors.white
  },
  tasksListView: {
    width: "100%"
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
