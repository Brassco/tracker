import React, { Component } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import { Colors } from "../../../../constants";

export default class TaskImputItem extends Component {
  constructor(props) {
    super(props);
    const { item: mainItem = {} } = props;
    const { item = false } = mainItem;
    this.refHouse;
    this.refMinutes;
    this.state = {
      description: !!item ? item.description : "",
      hours: !!item ? item.hours : "",
      minutes: !!item ? item.minutes : ""
    };
  }

  _onChangeText = description => {
    this.setState({ description });
  };
  _onChangeHouse = hours => {
    let value = hours.match(/[0-5]?[0-9]{1}/);
    if (Number.isNaN(value) || value === null) value = 0;
    this.setState({ hours: parseInt(value) });
    if (value.toString(10).length == 2) this.refMinutes.focus();
  };
  _onChangeMinutes = min => {
    let value = min.match(/[0-5]?[0-9]{1}/);
    if (Number.isNaN(value) || value === null) value = 0;
    this.setState({ minutes: parseInt(value) });
  };
  _saveTask = () => {
    const { description, hours = 0, minutes = 0 } = this.state;
    const index = this.props.item.index;

    this.props.saveTask(
      {
        description,
        hours: !hours ? 0 : hours,
        minutes: !minutes ? 0 : minutes
      },
      index
    );
  };

  render() {
    const { description, hours, minutes } = this.state;

    return (
      <View style={[styles.formListItem]}>
        <TextInput
          style={[styles.inputDescView, styles.inputDescText]}
          placeholder={"The describe the task"}
          onBlur={() => {
            this._saveTask();
          }}
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.fontGray}
          onChangeText={text => this._onChangeText(text)}
          value={description}
        />
        <View style={styles.TimeView}>
          <TextInput
            ref={ref => {
              this.refHouse = ref;
            }}
            style={[styles.inputTimeView, styles.inputTimeText]}
            placeholder={"00"}
            maxLength={2}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            placeholderTextColor={Colors.fontGray}
            onChangeText={hours => this._onChangeHouse(hours)}
            value={hours.toString(10)}
          />
          <View style={styles.inputRView}>
            <Text style={styles.inputTimeText}>:</Text>
          </View>
          <TextInput
            ref={ref => {
              this.refMinutes = ref;
            }}
            style={[styles.inputTimeView, styles.inputTimeText]}
            maxLength={2}
            keyboardType="numeric"
            placeholder={"00"}
            underlineColorAndroid="transparent"
            placeholderTextColor={Colors.fontGray}
            onChangeText={minutes => this._onChangeMinutes(minutes)}
            onBlur={() => {
              this._saveTask();
            }}
            value={minutes.toString(10)}
          />
        </View>
        <View style={styles.iconArrowView}>
          <View style={styles.iconCorrectView}>
            <Icon
              name="ios-close"
              type="ionicon"
              size={38}
              color={!description ? Colors.fontGray : Colors.seaWave}
              onPress={() => this.props.delTask(this.props.item.index)}
            />
          </View>
        </View>
      </View>
    );
  }
}
