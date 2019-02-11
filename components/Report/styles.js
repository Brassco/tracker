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
  },
  buttonWhite: {
    marginTop: 20,
    marginBottom: 13,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.seaWave,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingBottom: Platform.OS == "ios" ? 11 : 3
  },
  buttonGreenText: {
    color: Colors.seaWave,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 40
  }
});
