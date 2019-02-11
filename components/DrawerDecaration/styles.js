import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts } from "../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;
const whiteFieldWidth = 60;

export default StyleSheet.create({
  drawer: {
    ...ifIphoneX(
      {
        paddingTop: 30
      },
      {
        paddingTop: 0
      }
    ),
    width: width - whiteFieldWidth,
    justifyContent: "space-between",
    height: "100%"
  },
  whiteField: {
    ...ifIphoneX(
      {
        paddingTop: 50
      },
      {
        paddingTop: 30
      }
    ),
    width: whiteFieldWidth,
    backgroundColor: Colors.white
  },
  logo: {
    height: 130,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  list: {
    // height: 300,
    width: "100%"
  },
  footer: {
    ...ifIphoneX(
      {
        height: 120
      },
      {
        height: 70
      }
    ),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 0,
    width: "100%"
  }
});
