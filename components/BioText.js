// BioText.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BioText = ({ bio }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default BioText;
