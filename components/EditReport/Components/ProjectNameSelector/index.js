import React from "react";
import { Text, FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import { Layout, Colors, DefaultStyles } from "../../../../constants";
import styles from "./styles";

function _keyExtractor(item, index) {
  return index.toString();
}
const ProjectNameSelector = ({
  showItem = false,
  list = [],
  extraData,
  renderItem
}) => {
  if (!showItem) return null;
  return (
    <View
      style={[
        styles.formListItem,
        styles.formListItemSelect,
        {
          height: list.length > 0 ? 40 * list.length + 5 : 40
        }
      ]}
    >
      {list.length > 0 ? (
        <FlatList
          style={styles.tasksListView}
          data={list}
          extraData={extraData}
          keyExtractor={_keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <Text style={[styles.text, { color: Colors.darkGray }]}>
          You have no projects yet
        </Text>
      )}
    </View>
  );
};
export default ProjectNameSelector;
