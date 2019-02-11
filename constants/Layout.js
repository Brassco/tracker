import { Dimensions, Platform } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },
  ifIphoneX
};
