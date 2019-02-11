import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

export default StyleSheet.create({
  containerView: {
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
  periodView: {
    paddingTop: Platform.OS == "ios" ? 7 : 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: Colors.seaWave,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    backgroundColor: "#e5f3f6"
  },
  periodText: {
    fontSize: 18,
    lineHeight: 18,
    color: "#000",
    fontFamily: Fonts.FuturaMedium
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
