import React from "react";
import { Text, FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../../../constants";
import styles from "./styles";

function _keyExtractor(item, index) {
  return index.toString();
}
function addZero(number) {
  if (parseInt(number) < 10) return `0${parseInt(number)}`;
  return `${number}`;
}

function _renderItem(item, index) {
  const { description, hours, minutes } = item;
  return (
    <View style={{ backgroundColor: Colors.white, maxHeight: 100 }}>
      <View style={styles.formListItem}>
        <View style={styles.itemTitleView}>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.text}>
            {`${addZero(hours)}:${addZero(minutes)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const TaskTitleList = ({ tasks = [], extraData }) => (
  <FlatList
    style={{
      maxHeight: tasks.length * 100,
      width: "100%"
      // backgroundColor: "gold"
    }}
    data={tasks}
    extraData={extraData}
    keyExtractor={_keyExtractor}
    renderItem={({ item, index }) => _renderItem(item, index)}
  />
);

export default TaskTitleList;
