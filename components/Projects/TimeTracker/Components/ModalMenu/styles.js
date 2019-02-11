import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    ...ifIphoneX(
      {
        paddingTop: 155
      },
      {
        paddingTop: 130
      }
    )
  },
  menuView: {
    paddingTop: 10,
    alignSelf: "center",
    width: "80%",
    height: 350,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 20
  },

  topButton: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.fontGray,
    height: 40
  },
  textTopButtom: {
    color: Colors.fontMain,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 18,
    lineHeight: 30
  },
  inputRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50
  },
  inputView: {
    marginTop: 10,
    padding: 8,
    paddingRight: 4,
    paddingBottom: 4,
    width: "47%",
    borderWidth: 1,
    borderColor: Colors.fontGray,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  inputText: {
    color: Colors.fontGray,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: 18
  },
  buttonGreen: {
    marginVertical: 0,
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.seaWave,
    paddingBottom: 10
  },
  buttonWhiteText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 40
  },
  buttonWhite: {
    marginTop: 0,
    marginBottom: 13,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.seaWave,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingBottom: 10
  },
  buttonGreenText: {
    color: Colors.seaWave,
    textAlign: "center",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 40
  }
});
