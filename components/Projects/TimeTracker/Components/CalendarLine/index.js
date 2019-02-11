import React, { Component } from "react";
import { View, Text, FlatList, Platform, ScrollView } from "react-native";
import { Layout, Colors, DefaultStyles } from "../../../../../constants";
import { DateTime } from "luxon";
const { width, height } = Layout.window;
import styles from "./styles";

const TODAY = DateTime.local();

const BT_STEP = -60;
const TAIL_DATE = Math.abs(BT_STEP) + 4;
const CARD_WIDTH = parseInt(width / 7);

class Item extends Component {
  constructor(props) {
    super(props);
    this.itemRef;
    this.state = {
      position: 0
    };
  }

  transformChar(ref) {
    const self = this;

    ref.measure((fx, fy, width, height, px, py) => {
      if (px >= 3 * CARD_WIDTH && px < 4 * CARD_WIDTH) {
        self.setState({ position: px });
        self.props.cbResult();
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Math.abs(nextProps.offset - this.props.offset) > 1) {
      return true;
    }
    if (Math.abs(nextState.position - this.state.position) > 1) {
      return true;
    }
    return false;
  }

  render() {
    if (!!this.itemRef) this.transformChar(this.itemRef);

    const { item, mode } = this.props;

    switch (mode) {
      case "month":
        if (!item.startPeriod || !item.endDate) return null;

        const selectedMonth = item.startPeriod.toFormat("LLL");
        const year = item.endDate.toFormat("yyyy");

        return (
          <View style={styles.cadrView} ref={ref => (this.itemRef = ref)}>
            <View style={styles.modeM1LView}>
              <Text style={styles.textModeMonthL1}>{selectedMonth}</Text>
            </View>
            <View style={styles.modeM2LView}>
              <Text style={styles.textModeMonthL2}>{year}</Text>
            </View>
          </View>
        );

      case "week":
        if (!item.startPeriod || !item.endDate) return null;
        const startWeek = item.startPeriod.toFormat("dd.LL");
        const endWeek = item.endDate.toFormat("dd.LL");

        return (
          <View style={styles.cadrView} ref={ref => (this.itemRef = ref)}>
            <View style={styles.modeW1LView}>
              <Text style={styles.textModeWeek}>{startWeek}</Text>
            </View>
            <View style={styles.modeW2LView}>
              <Text style={styles.textModeWeek}>-</Text>
            </View>
            <View style={styles.modeW3LView}>
              <Text style={styles.textModeWeek}>{endWeek}</Text>
            </View>
          </View>
        );

      default:
        const month = item.toFormat("LLL");
        const day = item.toFormat("d");
        const weekDay = item.toFormat("ccc");
        return (
          <View style={styles.cadrView} ref={ref => (this.itemRef = ref)}>
            <View style={styles.mode1LView}>
              <Text style={[styles.textCard, styles.modeDayMonth]}>
                {month}
              </Text>
            </View>
            <View style={styles.mode2LView}>
              <Text style={[styles.textCard, styles.modeDayDay]}>{day}</Text>
            </View>
            <View style={styles.mode3LView}>
              <Text style={[styles.textCard, styles.modeDayWeekDay]}>
                {weekDay}
              </Text>
            </View>
          </View>
        );
    }
  }
}

export default class CalendarLine extends Component {
  constructor(props) {
    super(props);
    this.flatListRef;
    this.state = {
      arrPeriod: [],
      mode: "day",
      offset: 0
    };
  }

  getDateArray = data => {
    const {
      startPeriodPoint = null,
      endPeriodPoint = null,
      mode = "day"
    } = data;
    if (!!startPeriodPoint && !!endPeriodPoint)
      this.getTimePeriod(startPeriodPoint, endPeriodPoint);

    switch (mode) {
      case "week":
        this.getTimePeriodOfWeek();
        break;
      case "month":
        this.getTimePeriodOfMonth();
        break;
      default:
        this.getTimePeriodOfDay();
    }
  };

  getTimePeriodOfMonth = () => {
    const monthNuber = parseInt(TODAY.toFormat("L"));
    const firstDateOfThisMonth = DateTime.local().set({ day: 1 });
    const endDateOfThisMonth = firstDateOfThisMonth
      .plus({ month: 1 })
      .plus({ day: -1 });

    const target = {
      startDate: firstDateOfThisMonth,
      endDate: endDateOfThisMonth
    };

    const start = {
      startDate: target.startDate.plus({ month: BT_STEP }),
      endDate: target.endDate.plus({ month: BT_STEP })
    };

    let arrPeriod = [];
    arrPeriod.push(start);

    for (let i = 1; i < TAIL_DATE; i++) {
      arrPeriod.push({
        startPeriod: start.startDate.plus({ month: i }),
        endDate: start.endDate.plus({ month: i })
      });
    }

    this.setState({ arrPeriod, mode: "month", target });
  };

  getTimePeriodOfWeek = () => {
    const startDate = TODAY.plus({ days: 1 - parseInt(TODAY.toFormat("c")) });
    const endDate = startDate.plus({ days: 6 });
    const target = { startDate, endDate };

    const startPeriod = {
      startDate: target.startDate.plus({ week: BT_STEP }),
      endDate: target.endDate.plus({ week: BT_STEP })
    };

    let arrPeriod = [];
    arrPeriod.push(startPeriod);

    for (let i = 1; i < TAIL_DATE; i++) {
      arrPeriod.push({
        startPeriod: startPeriod.startDate.plus({ week: i }),
        endDate: startPeriod.endDate.plus({ week: i })
      });
    }
    this.setState({ arrPeriod, mode: "week", target });
  };

  getTimePeriodOfDay = () => {
    const startDate = TODAY.plus({ days: BT_STEP });
    let arrPeriod = [];
    arrPeriod.push(startDate);

    for (let i = 1; i < TAIL_DATE; i++) {
      arrPeriod.push(startDate.plus({ days: i }));
    }

    this.setState({ arrPeriod, mode: "day", target: TODAY });
  };

  _handler = (item, index) => {
    const period = {
      start: this.state.mode == "day" ? item : item.startPeriod,
      end: this.state.mode == "day" ? item : item.endDate
    };
    this.props.cbSelector(period);
  };

  onScroll = e => {
    this.setState({ offset: e.nativeEvent.contentOffset.x });
  };

  componentDidMount() {
    this.getDateArray(this.props.data);
    setTimeout(() => {
      this.flatListRef.scrollToEnd({ animated: false });
    }, 0);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      this.getDateArray(this.props.data);
      setTimeout(() => {
        this.flatListRef.scrollToEnd({ animated: false });
      }, 0);
    }
  }
  render() {
    const { arrPeriod, offset, mode } = this.state;

    return (
      <View style={styles.containView}>
        <ScrollView
          key={mode}
          ref={ref => {
            this.flatListRef = ref;
          }}
          onScroll={this.onScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          scrollEventThrottle={500}
        >
          {arrPeriod.length > 0 &&
            arrPeriod.map((data, index) => {
              return (
                <Item
                  key={index}
                  mode={mode}
                  offset={offset}
                  item={data}
                  cbResult={() => this._handler(data, index)}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
