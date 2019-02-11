import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../../constants";
const { width, height } = Layout.window;
const CARD_WIDTH = parseInt(width / 7);

export default StyleSheet.create({
  containView: {
    padding: 0,
    position: "absolute",
    width: CARD_WIDTH * 7,
    height: 55,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  cadrView: {
    width: CARD_WIDTH,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS == "ios" ? 7 : 0
  },
  textCard: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 26
  },
  mode1LView: {
    marginTop: Platform.OS == "ios" ? -2 : 2
  },
  modeDayMonth: {
    fontSize: 14,
    lineHeight: 14
  },
  mode2LView: {
    marginTop: Platform.OS == "ios" ? -4 : -8
  },
  modeDayDay: {
    fontSize: 18,
    lineHeight: 18
  },
  mode3LView: {
    marginTop: Platform.OS == "ios" ? -5 : -10
  },
  modeDayWeekDay: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.fontGray
  },
  modeW1LView: {
    top: 7,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  modeW2LView: {
    top: 19,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  modeW3LView: {
    top: 35,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  textModeWeek: {
    fontSize: 13,
    lineHeight: 13,
    color: "#0007",
    fontFamily: Fonts.FuturaMedium
  },
  modeM1LView: {
    top: 10,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  modeM2LView: {
    top: 30,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  textModeMonthL1: {
    fontSize: 18,
    lineHeight: 18,
    color: "#000",
    fontFamily: Fonts.FuturaMedium
  },
  textModeMonthL2: {
    fontSize: 13,
    lineHeight: 13,
    color: "#0007",
    fontFamily: Fonts.FuturaMedium
  }
});
