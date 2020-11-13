import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import AddressInputScreen1 from './app/screens/AddressInputScreen1';
import AddressInputScreen2 from './app/screens/AddressInputScreen2';
import PlaceScreen from './app/screens/PlaceScreen';
import ResultsScreen from './app/screens/ResultsScreen';


const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator  
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="AddressInput1" component={AddressInputScreen1} />
    <Stack.Screen name="AddressInput2" component={AddressInputScreen2} />
    <Stack.Screen name="Place" component={PlaceScreen} />
    <Stack.Screen name="Results" component={ResultsScreen} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

 

