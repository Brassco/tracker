import React from "react";
import { FlatList } from "react-native";
import TaskEditItem from "../TaskEditItem";
import styles from "./styles";

function _keyExtractor(item, index) {
  return index.toString();
}
function addZero(number) {
  if (parseInt(number) < 10) return `0${parseInt(number)}`;
  return `${number}`;
}

const TaskTitleList = ({ tasks, deleteTask, saveTask }) => {
  if (!tasks || tasks.length == 0) return null;
  return (
    <FlatList
      style={[styles.tasksListView, { height: tasks.length * 50 }]}
      data={tasks}
      extraData={tasks}
      keyExtractor={_keyExtractor}
      renderItem={({ item, index }) => (
        <TaskEditItem
          delTask={index => deleteTask(index)}
          saveTask={(task, index) => saveTask(task, index)}
          item={{ item, index }}
        />
      )}
    />
  );
};
export default TaskTitleList;
