import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Colors } from "../../../../constants";
import { DateTime } from "luxon";
import styles from "./styles";

const DateItem = ({ onPress, showItem, date, changedTime }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.formListItem, { borderBottomWidth: !showItem ? 1 : 5 }]}
  >
    <View style={styles.iconArrowView}>
      <Image
        style={{ height: 30, width: 30, marginTop: -10 }}
        source={require("../../../../assets/images/xxxhdpi/calendar.png")}
        resizeMode="contain"
      />
    </View>
    <View style={[styles.itemTitleView, { flex: 10 }]}>
      <Text style={styles.text} key={changedTime}>
        {DateTime.fromMillis(date.valueOf())
          .setLocale("en")
          .toLocaleString()}
      </Text>
    </View>
    <View
      style={[
        styles.iconArrowView,
        {
          backgroundColor: !showItem ? "white" : Colors.fontGray
        }
      ]}
    >
      <Image
        style={{
          height: 20,
          width: 20,
          transform: !showItem ? [{ rotateX: "0deg" }] : [{ rotateX: "180deg" }]
        }}
        source={require("../../../../assets/images/xxxhdpi/arrow_down.png")}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);
export default DateItem;
