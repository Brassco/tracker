import { Platform } from "react-native";

export default {
  FuturaLight: Platform.OS == "ios" ? "FuturaPT-Light" : "futura_pt_light",
  FuturaBook: Platform.OS == "ios" ? "FuturaPT-Book" : "futura_pt_book",
  FuturaMedium: Platform.OS == "ios" ? "FuturaPT-Medium" : "futura_pt_medium"
};
