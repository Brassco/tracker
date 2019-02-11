import React from "react";
import { View, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import styles from "./styles";

const DateSelector = ({ showItem = false, date, onDateChange }) => {
  if (!showItem) return null;

  return (
    <View style={styles.DatePickerView}>
      <DatePicker
        style={{
          transform: [{ scaleY: 0.9 }, { scaleX: 0.9 }],
          marginTop: Platform.OS == "ios" ? -33 : -5
        }}
        fadeToColor="#ffffff"
        textColor="#00c9d1"
        mode="date"
        date={date}
        onDateChange={x => onDateChange(x)}
      />
    </View>
  );
};
export default DateSelector;
