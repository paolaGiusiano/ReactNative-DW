
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfilePicture from '../components/ProfilePicture';
import StatCounter from '../components/StatCounter';
import BioText from '../components/BioText';
import PostGrid from '../components/PostGrid';


const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: 'username123',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRbdsXhw51TWfvt_tg59Kyv2NKmIJ2wherg&s',
    followers: 120,
    following: 200,
  });
  const [posts, setPosts] = useState([
    { imageUrl: 'https://content.elmueble.com/medio/2023/05/22/gatito_23e64e3b_230522124511_1000x1000.jpg' },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiVK0EMXYFvKZ2BtPUOcDcefUm1-DDaL91DXSwhAHD2IfV4ebd3Ceq3Ijn3rMjvYi60I&usqp=CAU' },
    { imageUrl: 'https://img.freepik.com/foto-gratis/concepto-viajes-sostenibles_23-2151049559.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724889600&semt=ais_hybrid' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfilePicture uri={profileData.avatar} size={100} />
        <Text style={styles.username}>{profileData.username}</Text>
      </View>
      
      <View style={styles.stats}>
        <StatCounter label="Posts" count={posts.length} />
        <StatCounter label="Followers" count={profileData.followers} />
        <StatCounter label="Following" count={profileData.following} />
      </View>

      <BioText bio={profileData.bio} />
      
      <View style={styles.postGrid}>
        <PostGrid posts={posts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  postGrid: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default Profile;
