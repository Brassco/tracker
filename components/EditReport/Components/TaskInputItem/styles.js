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
  inputDescView: {
    padding: 0,
    paddingTop: 6,
    height: 40,
    width: "70%",
    borderColor: Colors.fontGray,
    borderBottomWidth: 1
  },
  inputDescText: {
    fontSize: fontSize,
    color: Colors.black,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    padding: 0,
    textAlign: "left"
  },
  TimeView: {
    padding: 0,
    paddingTop: 6,
    flexDirection: "row",
    height: 40,
    width: 50,
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderColor: Colors.fontGray,
    borderBottomWidth: 1
  },
  inputTimeView: {
    padding: 0,
    paddingTop: 6,
    height: 40,
    width: 20,
    alignItems: "flex-end"
  },
  inputTimeText: {
    fontSize: fontSize,
    color: Colors.black,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    padding: 0,
    textAlign: "right"
  },
  inputRView: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    position: "absolute",
    bottom: Platform.OS == "ios" ? 5 : 10,
    left: 24
  },
  iconArrowView: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30
  }
});
