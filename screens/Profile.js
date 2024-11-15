import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Default from '../assets/Default.png'
const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const fetchProfileData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await fetch(`http://192.168.1.13:3001/api/user/profile/${id}`, {
      //const response = await fetch(`http://10.0.2.2:3001/api/user/profile/${id} `, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setPosts(data.user.posts || []);
        await AsyncStorage.setItem('friends', JSON.stringify(data.user.friends));
      } else {
        setError('Error al cargar el perfil');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3897f0" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
      <View style={styles.topProfile}>
      <Text style={styles.username}>{user.username}</Text>
      <TouchableOpacity title="Editar Perfil" style={styles.button} onPress={() => navigation.navigate('EditProfile')}><Text style={styles.textButton}>Editar Perfil</Text></TouchableOpacity>
      <TouchableOpacity title="Agregar Amigos" style={styles.button} onPress={() => navigation.navigate('AddFriend')}><Text style={styles.textButton}>Añadir Amigos</Text></TouchableOpacity>
      </View>
        <View style={styles.profileInfo}>
          <Image
            source= {{uri: user.profilePicture || String(Default) }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            {/* 
             */}
            <View style={styles.profileStats}>
              <Text>{posts.length} Posts</Text>
              <Text>{user.friends?.length || '0'} Amigos</Text>
            </View>
            <Text style={styles.bio}>Bienvenidos a mi perfil</Text>
          </View>
        </View>

        {/* Posts del usuario */}
        <View style={styles.postsContainer}>
          {posts.map((post, index) => (
            <Image key={index} source={{ uri: post.imageUrl }} style={styles.postImage} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  sidebar: {
    width: '20%',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    padding: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topProfile: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    marginTop: 10,
    backgroundColor:'white',
  },
  button: {
    width: 90,
    height:20,
    marginRight:20,
    marginTop:0,
    backgroundColor: 'gray',
    borderRadius: 5,
    tintColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
  textButton: {
    color: 'white',
    fontStyle: 'bold',
    fontSize: 12,
  },
  profileDetails: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight:20,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  bio: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
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
  },
});

export default Profile;
