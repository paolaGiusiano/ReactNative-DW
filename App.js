import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos de navegación
import { UserProvider } from './components/UserContext'; // Importar el contexto

import Login from './screens/Login'; 
import Signup from './screens/Signup';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import AddFriend from './screens/AddFriends';
import Logout from './screens/Logout';
import UploadPost from './screens/SubirPost';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        {/* Aquí manejas la lógica de si el usuario está autenticado o no */}
        <Stack.Navigator initialRouteName="Login">
          {/* Pantallas de autenticación */}
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={Signup} 
            options={{ headerShown: false }} 
          />

          {/* Pantallas principales después de iniciar sesión */}
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

// Este es el TabNavigator que contiene las pantallas principales.
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Feed') {
          iconName = 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        else if (route.name === 'UploadPost') {
          iconName = 'add-circle-outline';
        } 
        else if (route.name === 'AddFriend') {
          iconName = 'find';
        } else if (route.name === 'LogOut') {
          iconName = 'log-out-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3897f0',
      tabBarInactiveTintColor: 'gray',
      headerShown: false, // Ocultar encabezado en cada pantalla
    })}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="UploadPost" component={UploadPost} />
    <Tab.Screen name="AddFriend" component={AddFriend} />
    <Tab.Screen name="LogOut" component={Logout} options={{ title: 'Cerrar Sesión' }} />
  </Tab.Navigator>
);

export default App;
