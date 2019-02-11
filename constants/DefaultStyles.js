import { StyleSheet, Platform } from "react-native";
import Layout from "./Layout";
import Colors from "./Colors";
import Fonts from "./Fonts";

const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

export default StyleSheet.create({
  simpleText: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 32
  },
  titleText: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 28
  },
  headerTitle: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 24,
    lineHeight: 40
  },
  clockText: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaMedium,
    fontSize: 38,
    lineHeight: 60
  },
  buttonWhiteText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 28,
    lineHeight: 50
  },
  buttonGreenText: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 32
  },
  signboardText: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 32
  },
  header: {
    ...ifIphoneX(
      {
        height: 116
      },
      {
        height: 90
      }
    ),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold"
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  socialButton: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white
  },
  button: {
    marginVertical: 30,
    height: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: "76%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.seaWave,
    padding: 0
  }
});
