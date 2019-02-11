import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { Layout, Colors, DefaultStyles } from "../../../../constants";
import styles from "./styles";

const HEADER = ({
  nav,
  saveReportCBFunc = () => alert("Safe to database")
}) => (
  <View style={styles.headerView}>
    <View style={styles.leftHeaderView}>
      <Icon
        name="menu"
        size={34}
        color={Colors.seaWave}
        onPress={() => {
          try {
            nav.openDrawer();
          } catch (e) {}
        }}
        underlayColor={Colors.lightGray}
      />
    </View>

    <View style={styles.titleHeaderView}>
      <Text style={DefaultStyles.headerTitle}>New Report</Text>
    </View>

    <TouchableHighlight
      underlayColor={Colors.underlayColorButton}
      onPress={saveReportCBFunc}
      style={styles.rightHeaderView}
    >
      <Text style={styles.textRightButtonHeader}>Create</Text>
    </TouchableHighlight>
  </View>
);
export default HEADER;
