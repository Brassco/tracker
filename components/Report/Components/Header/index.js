import React from "react";
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import { Layout, Colors, DefaultStyles } from "../../../../constants";
import styles from "./styles";

const HEADER = ({ title, isOwner, goBack, goEditReport }) => (
  <View style={styles.headerView}>
    <TouchableOpacity style={styles.leftHeaderView} onPress={goBack}>
      <Image
        style={styles.goBackButtonImg}
        source={require("../../../../assets/images/xxxhdpi/btn_back_transparent.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>

    <View style={styles.titleHeaderView}>
      <Text style={DefaultStyles.headerTitle}>{title}</Text>
    </View>
    {!!isOwner ? (
      <TouchableOpacity onPress={goEditReport} style={styles.rightHeaderView}>
        <Text style={styles.textRightButtonHeader}>Edit</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.rightHeaderView} />
    )}
  </View>
);
export default HEADER;
