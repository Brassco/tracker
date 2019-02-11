import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants";

export default StyleSheet.create({
  DatePickerView: {
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    height: 160,
    width: "100%",
    borderBottomWidth: 5,
    borderColor: Colors.fontGray,
    backgroundColor: "white"
  }
});
