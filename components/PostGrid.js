// PostGrid.js
import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';

const PostGrid = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      numColumns={3}
      renderItem={({ item }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});

export default PostGrid;
