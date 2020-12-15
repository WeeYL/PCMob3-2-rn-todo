import React, {useEffect,useState} from 'react'
import styles, {navigationStyle} from '../stylesheet'
import { createStackNavigator } from '@react-navigation/stack';

import NotesScreen from "./NotesScreen"

const InnerStack = createStackNavigator()
export default function NotesStack(){
  return(
    <InnerStack.Navigator>
      <InnerStack.Screen name="notes" component={NotesScreen} options={navigationStyle.HeaderStyle1} />
    </InnerStack.Navigator>
  )
}