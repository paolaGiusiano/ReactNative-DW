import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostItem = ({ post }) => {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleString()}
        </Text>
      </View>
      <View style={styles.postImage}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#555',
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default PostItem;
