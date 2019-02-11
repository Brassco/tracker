import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts } from "../../../../constants";
const { width, height } = Layout.window;
const itemHeight = 55;

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: itemHeight
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    height: itemHeight
  },
  textView: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 5,
    height: itemHeight
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: itemHeight
  },
  itemImg: {
    height: itemHeight - 10
  },
  textTitle: {
    color: Colors.white,
    textAlign: "left",
    fontFamily: Fonts.FuturaBook,
    fontSize: 20,
    lineHeight: 50
  },
  itemImg: {
    height: "80%"
  },
  arrow: {
    height: 18,
    width: 18
  }
});
