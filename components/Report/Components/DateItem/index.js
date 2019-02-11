import React from "react";
import { Text, View, Image } from "react-native";
import { Colors } from "../../../../constants";
import { DateTime } from "luxon";
import styles from "./styles";

const DateItem = ({ date }) => (
  <View style={[styles.formListItem, { borderBottomWidth: 1 }]}>
    <View style={styles.iconArrowView}>
      <Image
        style={{ height: 30, width: 30, marginTop: -10 }}
        source={require("../../../../assets/images/xxxhdpi/calendar.png")}
        resizeMode="contain"
      />
    </View>
    <View style={[styles.itemTitleView, { flex: 10 }]}>
      <Text style={styles.text}>
        {DateTime.fromMillis(date.valueOf())
          .setLocale("en")
          .toLocaleString()}
      </Text>
    </View>
  </View>
);
export default DateItem;
