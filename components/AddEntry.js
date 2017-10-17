import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import TextButton from './TextButton';
import DateHeader from './DateHeader';

import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';

import { white, purple } from '../utils/colors';

const Container = styled.View`
  flex: 1;
  padding: 20;
  background-color: ${white};
`;

const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 30;
  margin-right: 30;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
    onPress={onPress}
  ><Text style={ styles.submitBtnText }>Submit</Text></TouchableOpacity>
);

class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState( (state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      }
    });
  }

  decrement = (metric) => {
    this.setState( (state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    });
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    });
  }

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: entry
    }));

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    // Navigate to home

    submitEntry({ key, entry });

    // Clear local notification
  }

  reset = () => {
    const key = timeToString();

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }));

    // Route to home

    removeEntry( key );
  }

  render () {

    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <Center>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text style={{textAlign: 'center'}}>You already logged your information for today</Text>
          <TextButton
            style={{ padding: 10 }}
            onPress={this.reset}
          >Reset</TextButton>
        </Center>
      )
    }

    return (
      <Container>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {Object.keys(metaInfo).map( key => {
          const { getIcon, type, ...rest} = metaInfo[key];
          const value = this.state[key];

          return (
            <Row key={key}>
              { getIcon() }
              { type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={ (value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={ () => this.increment(key) }
                    onDecrement={ () => this.decrement(key) }
                    {...rest}
                  />
              }
            </Row>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignContent: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
});

const mapStateToProps = state => {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && state[key].today === undefined
  }
}

export default connect(mapStateToProps)(AddEntry);
