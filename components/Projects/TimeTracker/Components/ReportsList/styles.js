import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../../constants";
const { width, height } = Layout.window;

const ITEM_HEIGHT = 60;
const fontSize = 16;
export default StyleSheet.create({
  reportsListView: {
    // width: "100%",
    // height: "100%",
    // backgroundColor: "#e5f3f6"
  },

  listItemContainer: {
    width: "100%",
    minHeight: ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.fontGray50,
    backgroundColor: Colors.fon
  },
  swipeoutView: {
    minWidth: ITEM_HEIGHT,
    minHeight: ITEM_HEIGHT,
    backgroundColor: Colors.seaWave
  },
  iconViewEdit: {
    minWidth: ITEM_HEIGHT,
    minHeight: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.fontGray50,
    backgroundColor: Colors.seaWave
  },
  iconViewDelete: {
    minWidth: ITEM_HEIGHT + 30,
    minHeight: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 3,
    borderRightColor: Colors.darkBlue,
    backgroundColor: Colors.darkBlue
  },
  rightView: {
    height: ITEM_HEIGHT,
    flex: 5
  },
  nameView: {
    position: "absolute",
    top: Platform.OS == "ios" ? 10 : 5,
    left: 20,
    height: ITEM_HEIGHT / 2,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleView: {
    position: "absolute",
    top: 30,
    left: 20,
    height: ITEM_HEIGHT / 2,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  totlaTimeView: {
    flex: 1,
    position: "absolute",
    top: 5,
    right: 20,
    height: ITEM_HEIGHT,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  textName: {
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: fontSize * 1.2
  },
  textTitle: {
    color: Colors.fontGray,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize * 0.9,
    lineHeight: fontSize * 1.2
  },
  textTime: {
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: fontSize * 1.2
  },
  iconText: {
    color: Colors.white,
    fontFamily: Fonts.FuturaBook,
    fontSize: 12
  },
  header: {
    width: "100%",
    height: 25,
    paddingTop: Platform.OS == "ios" ? 5 : 0,
    paddingLeft: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.fontGray50,
    backgroundColor: "#e5f3f6"
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.FuturaBook,
    fontSize: 16
  }
});
