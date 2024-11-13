import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Default from '../assets/Default.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFriend = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); // Espera el token
            const response = await fetch('http://192.168.1.13:3001/api/user/all', {
            //const response = await fetch('http://10.0.2.2:3001/api/user/all', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();

            if (response.ok) {
              setUsers(data); // Asegúrate de que la respuesta sea un arreglo de usuarios
              console.log(data);
            } else {
              setUsers([]);
              setError('Error al cargar la lista de usuarios');
            }
        } catch (error) {
          setError('Error al conectar con el servidor');
          setUsers([]);
        }
    };

    fetchUsers();
  }, []);

  const handleAddFriend = async (friendId) => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(`http://192.168.1.13:3001/api/user/add-friend/${friendId}`, {
      //const response = await fetch(`http://10.0.2.2:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(data.message);
      } else {
        setError(data.message || 'Error al agregar amigo');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addFriendPage}>
        <Text style={styles.title}>Agregar Amigos</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <FlatList
          data={users} 
          renderItem={({ item }) => (
            <View style={styles.userCard} key={item._id}>
              <Image
                source={{ uri: String(item.profilePicture) }} //La convierto a string porque sino se le pasaba como Double.
                style={styles.profilePicture}
              />
              <TouchableOpacity onPress={() => navigation.navigate(`ProfileFriend/${item._id}`)}>
                <Text style={styles.username}>@{item.username}</Text>
              </TouchableOpacity>
              <Button title="Agregar Amigo" onPress={() => handleAddFriend(item._id)} />
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
  },
  addFriendPage: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddFriend;
