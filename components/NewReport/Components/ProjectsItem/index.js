import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Colors } from "../../../../constants";
import styles from "./styles";

const ProjectsItem = ({ onPress, showItem, selected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.formListItem, { borderBottomWidth: !showItem ? 1 : 5 }]}
  >
    <View style={[styles.itemTitleView, { flex: 10 }]}>
      <Text style={styles.text}>
        {!selected ? "Select project:" : selected.name}
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
export default ProjectsItem;
