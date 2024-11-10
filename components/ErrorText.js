import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ message }) => (
  message ? <Text style={styles.error}>{message}</Text> : null
);

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ErrorText;
