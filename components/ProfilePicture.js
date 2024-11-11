// ProfilePicture.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ uri, size = 80 }) => {
  return (
    <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
  );
};

const styles = StyleSheet.create({
  image: {
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default ProfilePicture;
