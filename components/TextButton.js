import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { purple } from '../utils/colors';

const ResetButtonText = styled.Text`
  text-align: center;
  color: ${purple};
`

const TextButton = ({ children, onPress, style = {} }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <ResetButtonText style={style}>{children}</ResetButtonText>
    </TouchableOpacity>
  );

}

export default TextButton;
