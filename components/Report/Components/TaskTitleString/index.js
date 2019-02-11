import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const TaskTitleString = ({ time }) => (
  <View style={styles.formListItem}>
    <View style={styles.itemTitleView}>
      <Text style={styles.text}>Tasks</Text>
    </View>
    <View style={styles.timeView}>
      <Text style={styles.text}>{time}</Text>
    </View>
  </View>
);
export default TaskTitleString;
