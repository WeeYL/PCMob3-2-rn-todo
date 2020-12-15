import React, {useEffect,useState} from 'react'
import {View, Text, FlatList, TouchableOpacity} from "react-native"
import styles, {navigationStyle} from './stylesheet'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 

import NotesStack from './screens/NotesStack'
import AddScreen from './screens/AddScreen'
import EditScreen from './screens/EditScreen'


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="notes stack" component={NotesStack} options={{headerShown:false}}/>
        <Stack.Screen name="add notes" component={AddScreen}/>
        <Stack.Screen name="edit notes" component={EditScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




