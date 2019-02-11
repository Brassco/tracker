import React from "react";
import { Text, FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import Swipeout from "rc-swipeout";
import { Colors } from "../../../../constants";
import styles from "./styles";

function _keyExtractor(item, index) {
  return index.toString();
}
function addZero(number) {
  if (parseInt(number) < 10) return `0${parseInt(number)}`;
  return `${number}`;
}

function _renderItem(item, index, deleteTask) {
  const { description, hours, minutes } = item;
  return (
    <Swipeout
      style={{
        backgroundColor: Colors.white
      }}
      autoClose
      right={[
        {
          text: (
            <View style={styles.iconArrowView}>
              <Icon
                name="ios-close"
                type="ionicon"
                size={34}
                color={Colors.seaWave}
              />
            </View>
          ),

          onPress: () => deleteTask(index)
        }
      ]}
    >
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
    </Swipeout>
  );
}

const TaskTitleList = ({ tasks = [], extraData, deleteTask }) => (
  <FlatList
    style={[styles.tasksListView, { height: tasks.length * 50 }]}
    data={tasks}
    extraData={extraData}
    keyExtractor={_keyExtractor}
    renderItem={({ item, index }) => _renderItem(item, index, deleteTask)}
  />
);
export default TaskTitleList;
