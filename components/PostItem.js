import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ post }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile', { username: post.username });
  };

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Text style={styles.username}>{post.username}</Text>
        </TouchableOpacity>
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    borderRadius: 8,
  },
  caption: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default PostItem;
