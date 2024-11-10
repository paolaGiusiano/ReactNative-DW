// components/Images.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Images = ({ source, style, resizeMode = 'contain' }) => {
  return (
    <Image 
      source={source} 
      style={[styles.default, style]} 
      resizeMode={resizeMode} 
    />
  );
};

const styles = StyleSheet.create({
  default: {

  },
});

export default Images;
