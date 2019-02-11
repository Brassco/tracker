import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";

const ItemMenu = ({
  active = false,
  img,
  title,
  func = () => alert(`${title}`),
  end = false
}) => (
  <TouchableHighlight
    onPress={func}
    style={[
      styles.item,
      { backgroundColor: !!active ? "rgba(255,255,255,0.15)" : "transparent" }
    ]}
    underlayColor="#083442"
  >
    <View style={styles.item}>
      <View style={styles.imgView}>
        <Image style={styles.itemImg} source={img} resizeMode="contain" />
      </View>
      <View style={styles.textView}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <View style={styles.iconView}>
        {!end && (
          <Image
            style={styles.arrow}
            source={require("../../../../assets/images/xxxhdpi/arrow_right.png")}
            resizeMode="contain"
          />
        )}
        {/* <Icon name="ios-arrow-forward" type="ionicon" size={28} color="white" />*/}
      </View>
    </View>
  </TouchableHighlight>
);

export default ItemMenu;
