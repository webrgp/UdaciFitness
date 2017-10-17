import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';

const CalItem = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  margin-left: 10;
  margin-right: 10;
  margin-top: 17;
  justify-content: center;
  shadow-color: rgba(0, 0, 0, 0.24);
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.8;
  shadow-radius: 3;
  background-color: ${white};
  border-radius: ${Platform.OS === 'ios' ? 16 : 2};
`

const NoDataText = styled.Text`
  font-size: 20;
  padding-top: 20;
  padding-bottom: 20;
`

class History extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResults()
      .then( entries => dispatch(receiveEntries(entries)))
      .then( ({entries}) => {
        if(!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <CalItem>
      {today
        ? <View>
            <DateHeader date={formattedDate} />
            <NoDataText>{today}</NoDataText>
          </View>
        : <TouchableOpacity onPress={ () => {console.log('pressed')} }>
            <Text>{JSON.stringify(metrics)}</Text>
          </TouchableOpacity>
      }
    </CalItem>
  )

  renderEmptyDate(formattedDate) {
    return (
      <CalItem>
        <DateHeader date={formattedDate} />
        <NoDataText>You didn't log any data on this day.</NoDataText>
      </CalItem>
    );
  }

  render () {

    const { entries } = this.props;
    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={ this.renderItem }
        renderEmptyDate={ this.renderEmptyDate }
      />
    );
  }
}


const mapStateToProps = entries => {
  return {
    entries
  }
};

export default connect(mapStateToProps)(History);
