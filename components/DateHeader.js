import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { purple } from '../utils/colors';

const DateHeaderText = styled.Text`
  color: ${purple};
  font-size: 25;
`

const DateHeader = ({ date }) => (
  <DateHeaderText>{date}</DateHeaderText>
);

export default DateHeader
