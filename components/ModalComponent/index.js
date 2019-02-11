import React, { Component } from "react";
import { Text, View } from "react-native";
import { Layout, Colors, DefaultStyles, User } from "../../constants";
import { Icon } from "react-native-elements";
import styles from "./styles";

const ModalComponent = ({ text = false, title = false }) => (
  <View style={styles.modalContainer}>
    <View style={styles.modalIconView}>
      <Icon
        name="ios-checkmark-circle-outline"
        type="ionicon"
        size={46}
        color={Colors.white}
        underlayColor={Colors.seaWaveLight}
      />
    </View>
    <View style={styles.modalTextView}>
      {!!text && <Text style={styles.modalText}>{text}</Text>}
      {!!title && <Text style={styles.modalText}>{title}</Text>}
    </View>
  </View>
);
export default ModalComponent;
