import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Layout, Colors, DefaultStyles } from "../../../../../constants";
import styles from "./styles";
import CalendarLine from "../CalendarLine";

const Calendar = ({
  data = {},
  cbSelector,
  cbSearchButton = () => alert("cbSearchButton")
}) => (
  <View style={styles.calendarView}>
    <CalendarLine data={data} cbSelector={period => cbSelector(period)} />
    <Image
      pointerEvents={"none"}
      style={{ width: "100%", height: 65, position: "absolute" }}
      source={require("../../../../../assets/images/calendarFon3.png")}
      resizeMode="stretch"
    />
    <View style={styles.labelView} pointerEvents={"none"}>
      <Image
        resizeMode="contain"
        style={{ width: "100%" }}
        source={require("../../../../../assets/images/xxxhdpi/selected_border.png")}
      />
    </View>
    <TouchableOpacity style={styles.button} onPress={cbSearchButton} />
  </View>
);

export default Calendar;
