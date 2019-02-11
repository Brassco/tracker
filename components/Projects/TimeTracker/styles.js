import { StyleSheet, Platform } from "react-native";
import { Layout, Colors, Fonts } from "../../../constants";
const { width, height } = Layout.window;
const ifIphoneX = Layout.ifIphoneX;

export default StyleSheet.create({
  topView: {
    ...ifIphoneX(
      {
        paddingTop: 35,
        height: 255
      },
      {
        paddingTop: 20,
        height: 240
      }
    ),
    width: "100%",
    alignItems: "center"
  },
  headerView: {
    height: 40,
    flexDirection: "row"
  },
  clockView: {
    height: 80,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  leftHeaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleHeaderView: {
    flex: 3,
    padding: 0,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  rightHeaderView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  labelView: {
    marginTop: -15,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
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
  calendar: {
    position: "absolute",
    width: "100%",
    height: 40,
    backgroundColor: "black"
  },
  listView: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "pink"
  }
});
