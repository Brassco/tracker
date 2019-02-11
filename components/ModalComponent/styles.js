import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const H = 50;
export default StyleSheet.create({
  modalIconView: {
    flex: 1,
    height: H,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  modalTextView: {
    flex: 5,
    height: H,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  modalText: {
    color: Colors.white,
    textAlign: "auto",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 20
  },
  modalContainer: {
    flexDirection: "row",
    alignItems: Platform.OS == "ios" ? "flex-end" : "center",
    borderBottomWidth: 5,
    borderColor: Colors.seaWaveLight,
    backgroundColor: Colors.seaWave,
    width: "100%",
    ...ifIphoneX(
      {
        height: 95
      },
      {
        height: 80
      }
    )
  }
});
