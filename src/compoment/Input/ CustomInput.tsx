import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ ...props }) => (
  <TextInput
    style={styles.input}
    placeholderTextColor="#b39ddb"
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#22203a',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#7c43bd',
  },
});

export default CustomInput;