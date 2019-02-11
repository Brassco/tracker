import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../../../constants";
import styles from "./styles";

const TaskTitleString = ({
  time,
  delTasks = () => alert("Delete all Tasks")
}) => (
  <View style={styles.formListItem}>
    <View style={styles.itemTitleView}>
      <Text style={styles.text}>Tasks</Text>
    </View>
    <View style={styles.timeView}>
      <Text style={styles.text}>{time}</Text>
    </View>
    <View style={styles.iconArrowView}>
      <View style={styles.iconCorrectView}>
        <Icon
          name="ios-close"
          type="ionicon"
          size={38}
          color={Colors.seaWave}
          onPress={() => delTasks()}
        />
      </View>
    </View>
  </View>
);
export default TaskTitleString;
