import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../../constants";
import styles from "./styles";

const ProjectsItem = ({ title }) => (
  <View style={styles.formListItem}>
    <View style={[styles.itemTitleView, { flex: 10 }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </View>
);
export default ProjectsItem;
