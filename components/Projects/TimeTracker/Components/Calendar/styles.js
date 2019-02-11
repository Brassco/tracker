import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

export default StyleSheet.create({
  calendarView: {
    ...ifIphoneX(
      {
        top: 190
      },
      {
        top: 175
      }
    ),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: 65,
    backgroundColor: "#e5f3f6"
  },
  labelView: {
    marginTop: -17,
    width: 75,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    position: "absolute",
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    top: -40
  }
});
