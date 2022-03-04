
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import IssLocationScreen from './screens/IssLocation';
import MeteorScreen from './screens/Meteors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenStack } from 'react-native-screens';
import React from "react";

const Stack=createStackNavigator()

export default function App() {
  return (

   <NavigationContainer>
    <Stack.Navigator InitialRouteName="Home"
    screenOptions={{headerShown:false}}
    > 
      <Stack.Screen
      name="Home" component={HomeScreen}
      />
      <Stack.Screen
      name="IssLocation" component={IssLocationScreen}
      />
      <Stack.Screen
      name="Meteors" component={MeteorScreen}
      />
    </Stack.Navigator>

   </NavigationContainer>

    


      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
