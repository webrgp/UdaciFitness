import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { white, gray, purple } from '../utils/colors';

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const MetricCounter = styled.View`
  width: 85;
  justify-content: center;
  align-items: center;
`

const IosButton = styled.TouchableOpacity`
  background-color: ${white};
  border-color: ${purple};
  border-width: 1;
  border-radius: 3;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 25;
  padding-right: 25;
`

const androidButton = styled.TouchableOpacity`
  background-color: ${purple};
  margin: 5;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  border-radius: 2;
`

const UdaciSteppers = ({ max, unit, step, value, onIncrement, onDecrement }) => (
  <Row style={{ justifyContent: 'space-between' }}>

    {Platform.OS === 'ios'
      ? <View style={{flexDirection: 'row'}}>
          <IosButton
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            onPress={onDecrement}>
            <Entypo name='minus' size={30} color={purple} />
          </IosButton>
          <IosButton
            style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
            onPress={onIncrement}>
            <Entypo name='plus' size={30} color={purple} />
          </IosButton>
        </View>
      : <View style={{flexDirection: 'row'}}>
          <androidButton
            style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            onPress={onDecrement}>
            <FontAwesome name='minus' size={30} color={white} />
          </androidButton>
          <androidButton
            style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
            onPress={onIncrement}>
            <FontAwesome name='plus' size={30} color={white} />
          </androidButton>
        </View>}

    <MetricCounter>
      <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
      <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
    </MetricCounter>
  </Row>
);

export default UdaciSteppers
