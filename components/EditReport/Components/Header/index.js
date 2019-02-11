import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Layout, Colors, DefaultStyles } from "../../../../constants";
import styles from "./styles";

const HEADER = ({
  nav,
  disabled,
  title,
  textRightButton,
  saveReportCBFunc = () => alert("Safe to database")
}) => (
  <View style={styles.headerView}>
    <TouchableOpacity
      style={styles.leftHeaderView}
      onPress={() => nav.goBack()}
    >
      <Image
        style={styles.goBackButtonImg}
        source={require("../../../../assets/images/xxxhdpi/btn_back_transparent.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>

    <View style={styles.titleHeaderView}>
      <Text style={DefaultStyles.headerTitle}>{title}</Text>
    </View>

    <TouchableOpacity
      disabled={disabled}
      onPress={saveReportCBFunc}
      style={styles.rightHeaderView}
    >
      <Text
        style={[
          styles.textRightButtonHeader,
          { color: disabled ? Colors.fontGray : Colors.seaWave }
        ]}
      >
        {disabled ? "no changes" : "Save"}
      </Text>
    </TouchableOpacity>
  </View>
);
export default HEADER;
