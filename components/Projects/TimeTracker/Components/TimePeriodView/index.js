import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Layout, Colors, DefaultStyles } from "../../../../../constants";
import styles from "./styles";

const TimePeriodView = ({
  data = null,
  cbSearchButton = () => alert("cbSearchButton")
}) => (
  <View style={styles.containerView}>
    <View style={styles.labelView}>
      <Image
        resizeMode="contain"
        style={{ width: "100%" }}
        source={require("../../../../../assets/images/xxxhdpi/selected_period.png")}
      />
    </View>
    <View style={styles.periodView}>
      {!!data && !!data.startDate && data.endDate && (
        <Text style={styles.periodText}>
          {`${data.startDate.toFormat("LLL d, yyyy")} – ${data.endDate.toFormat(
            "LLL d, yyyy"
          )}`}
        </Text>
      )}
    </View>
    <TouchableOpacity style={styles.button} onPress={cbSearchButton} />
  </View>
);

export default TimePeriodView;
