import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { Layout, Colors, DefaultStyles } from "../../../../../constants";
import Swipeout from "rc-swipeout";
import { DateTime } from "luxon";

import styles from "./styles";
const ITEM_HEIGHT = 60;

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  deleteReport = () => alert("deleteReport");
  editReport = () => alert("editReport");
  render() {
    const { totlaTime, fullName, title } = this.props;
    return (
      <Swipeout
        style={styles.swipeoutView}
        autoClose
        right={[
          {
            text: (
              <View style={styles.iconViewEdit}>
                <Icon
                  name="square-edit-outline"
                  type="material-community"
                  size={34}
                  color={Colors.white}
                />
                <Text style={styles.iconText}>Edit</Text>
              </View>
            ),

            onPress: () => this.editReport(index)
          },
          //trash-alt edit FontAwesome5_Solid
          {
            text: (
              <View style={styles.iconViewDelete}>
                <Icon
                  name="trash-can-outline"
                  type="material-community"
                  size={30}
                  color={Colors.white}
                />
                <Text style={styles.iconText}>Remote</Text>
              </View>
            ),

            onPress: () => this.deleteReport(index)
          }
        ]}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.rightView}>
            <View style={styles.nameView}>
              <Text style={styles.textName}>{fullName}</Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.textTitle}>{title}</Text>
            </View>
          </View>
          <View style={styles.totlaTimeView}>
            <Text style={styles.textTime}>{totlaTime}</Text>
          </View>
        </View>
      </Swipeout>
    );
  }
}

class ReportsList extends React.PureComponent {
  _keyExtractor = (item, index) => item.rid + item.pid;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => {
    const header = item.header;
    return (
      <View>
        {!!header && (
          <View style={styles.header}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
        )}
        <ListItem
          header={item.header}
          id={item.pid}
          totlaTime={item.totlaTime}
          fullName={item.userDisplayName}
          title={item.title}
        />
      </View>
    );
  };

  _addHedear = () => {
    const { data: tempData, mode } = this.props;
    let arr = [];
    arr = [...tempData].map(i => {
      const obj = { ...i };
      const data = DateTime.fromMillis(obj.date.getTime());
      obj.date = data;
      return obj;
    });

    if (mode == "day") {
      arr.sort((a, b) => (a.userDisplayName < b.userDisplayName ? 1 : -1));
    } else {
      let dateSave;
      arr
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .forEach(i => {
          const date = i.date.toFormat("LLL d, yyyy");
          i.header = date !== dateSave ? date : false;
          dateSave = date;
        });
    }
    return arr;
  };

  render() {
    const data = this._addHedear();

    if (data.lenght == 0) return null;

    return (
      <FlatList
        style={styles.reportsListView}
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ReportsList;
