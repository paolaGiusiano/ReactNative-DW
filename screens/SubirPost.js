import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Button, Image, Text, TextInput } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const UploadPost = () => {
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState("");

  // Función para seleccionar una imagen
  const selectImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Usuario Cancelo la subida de imagen');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Función para hacer el fetch a la API y subir la imagen y el post
  const uploadPost = async () => {
    if (!imageUri) {
      alert("Seleccione una imagen por favor");
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
    formData.append('description', description);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.13:3001/api/posts/feed', {
      //const response = await fetch('http://10.0.2.2:3001/api/posts/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`

        },
        body: formData
      });

      if (response.ok) {
        alert("Post subido correctamente!");
        setImageUri(null);
        setDescription("");
      } else {
        alert("Fallo al subir post");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrio un error al subir el post");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Seleccione Imagen" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      <TextInput
        placeholder="Descripcion"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, width: '80%', padding: 10, marginTop: 20 }}
      />
      <Button title="Publicar" onPress={uploadPost} />
    </View>
  );
};

export default UploadPost;
