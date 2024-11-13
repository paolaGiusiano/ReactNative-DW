import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import PostItem from '../components/PostItem'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://192.168.1.13:3001/api/posts/feed', {
        //const response = await fetch('http://10.0.2.2:3001/api/posts/feed', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          setError('Error al cargar los posts');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3897f0" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {posts.length === 0 ? (
        <Text style={styles.noPosts}>No hay posts para mostrar.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostItem post={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noPosts: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default Feed;
