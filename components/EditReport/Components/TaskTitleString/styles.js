import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts } from "../../../../constants";

const fontSize = 16;
const lineHeight = 30;

export default StyleSheet.create({
  formListItem: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    padding: 0,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  itemTitleView: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 5
  },
  timeView: {
    flex: 1,
    marginBottom: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 5,
    paddingBottom: 5,
    width: 100,
    height: 30
  },
  text: {
    paddingLeft: 10,
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaMedium,
    fontSize: fontSize,
    lineHeight: Platform.OS == "ios" ? 0 : lineHeight
  },
  iconArrowView: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: 30,
    height: 30
  },
  iconCorrectView: {
    position: "absolute",
    top: -8,
    right: 8
  }
});
