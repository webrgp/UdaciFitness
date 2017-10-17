import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { gray } from '../utils/colors';

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

const UdaciSlider = ({ max, unit, step, value, onChange }) => (
  <Row>
    <Slider
      style={{ flex: 1 }}
      step={step}
      value={value}
      maximumValue={max}
      minimumValue={0}
      onValueChange={onChange}
    />
    <MetricCounter>
      <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
      <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
    </MetricCounter>
  </Row>
);

export default UdaciSlider
