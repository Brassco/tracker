import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Layout } from "../../../../constants";
const { width, height } = Layout.window;
const fontSize = 16;
const lineHeight = 30;

export default StyleSheet.create({
  tasksListView: { width: "100%" },
  formListItem: {
    width: "100%",
    minHeight: 50,
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white
  },
  itemTitleView: {
    minHeight: 50,
    flex: 4,
    paddingTop: Platform.OS == "ios" ? 5 : 0,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: 0
  },
  timeView: {
    minHeight: 50,
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 5 : 0,
    marginBottom: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 5
  },
  text: {
    paddingLeft: 10,
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: Platform.OS == "ios" ? fontSize : lineHeight
  },
  iconArrowView: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
});
