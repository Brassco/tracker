import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { Layout, Colors } from "../../../../../constants";
import styles from "./styles";
import { DateTime } from "luxon";

class ModalMenu extends Component {
  constructor(props) {
    super(props);
    this.refInput;
    this.state = {
      from: "",
      to: "",
      validateStartDate: null,
      validateEndtDate: null,
      result: { startDate: null, endDate: null, mode: "day" },
      keyboardShow: false
    };
  }

  onChangeText(type, text) {
    let value;
    value = text.replace(/[^0-9-:\.\/ a-zA-Z]/, "").trim();
    this.setState({ [type]: value });
    this.validate(type, value);
  }

  validate = (type, text) => {
    const vType = type == "from" ? "validateStartDate" : "validateEndtDate";
    let date,
      result,
      error = false;
    result = text.match(/(\d{1,2})[\D]{1}(\d{1,2})[\D](\d{4})/);
    if (!!result) {
      const obj = {
        year: +result[3],
        month: +result[1],
        day: +result[2]
      };
      date = DateTime.fromObject(obj);
    }
    if (!result) this.setState({ [vType]: null });
    else if (date.toString() == "Invalid DateTime")
      this.setState({ [vType]: false });
    else {
      const rType = type == "from" ? "startDate" : "endDate";
      const result = { ...this.state.result, [rType]: date, mode: "period" };
      this.setState({ [vType]: true, result });
    }
  };

  chouseMode = mode => {
    const result = { ...this.state.result, mode };
    this.props.getResultDate(result);
    this.props.closeModal();
  };

  _keyboardDidShow() {
    this.setState({ keyboardShow: true });
  }
  _keyboardDidHide() {
    this.setState({ keyboardShow: false });
  }

  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this._keyboardDidShow()
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this._keyboardDidHide()
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const {
      result,
      from,
      to,
      keyboardShow,
      validateStartDate,
      validateEndtDate
    } = this.state;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.closeModal()}
      >
        <View style={[styles.menuView, { marginTop: keyboardShow ? -110 : 0 }]}>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => this.chouseMode("day")}
          >
            <Text style={styles.textTopButtom}>Daily</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButton}
            onPress={() => this.chouseMode("week")}
          >
            <Text style={styles.textTopButtom}>Weekly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButton}
            onPress={() => this.chouseMode("month")}
          >
            <Text style={styles.textTopButtom}>Monthly</Text>
          </TouchableOpacity>
          <View style={styles.inputRowView}>
            <TextInput
              style={[
                styles.inputView,
                styles.inputText,
                {
                  backgroundColor: !!validateStartDate
                    ? "#00ff0011"
                    : validateStartDate === false
                    ? "#ff000011"
                    : "#fff"
                }
              ]}
              placeholder={"From"}
              onBlur={() => this.refInput.focus()}
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.fontGray}
              onChangeText={text => this.onChangeText("from", text)}
              value={from}
            />
            <TextInput
              ref={ref => {
                this.refInput = ref;
              }}
              style={[
                styles.inputView,
                styles.inputText,
                {
                  backgroundColor: !!validateEndtDate
                    ? "#00ff0011"
                    : validateEndtDate === false
                    ? "#ff000011"
                    : "#fff"
                }
              ]}
              placeholder={"To"}
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.fontGray}
              onChangeText={text => this.onChangeText("to", text)}
              value={to}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={() => {
              this.props.getResultDate(result);
              this.props.closeModal();
            }}
          >
            <Text style={styles.buttonWhiteText}>Choose</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonWhite}
            onPress={() => this.props.closeModal()}
          >
            <Text style={styles.buttonGreenText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ModalMenu;
