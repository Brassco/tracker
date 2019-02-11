import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

const fontSize = 16;
const lineHeight = 30;

export default StyleSheet.create({
  topView: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    ...ifIphoneX(
      {
        paddingTop: 35
      },
      {
        paddingTop: 20
      }
    )
  },
  renderItemProjectView: {
    height: 40,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  renderItemProjectText: {
    paddingLeft: 10,
    color: Colors.black,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: fontSize,
    lineHeight: lineHeight
  }
});
