import React, {useEffect,useState} from 'react'
import {View, Text, FlatList, TouchableOpacity,TextInput} from "react-native"
import styles, {navigationStyle} from '../stylesheet'



export default function AddScreen({navigation, route}){

    const [text, setText] = useState()

    return <View style={styles.container}>

      <Text style={{fontSize:20, color: "blue"}}>
        Add a note 
      </Text>


      <TextInput style={{padding:10, textAlignVertical: 'top', height: 80, width:"90%", borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text=>setText(text)}
      multiline={true}>
      </TextInput>

      <View style={{ borderColor: 'gray', borderWidth: 1,width:"90%",alignItems:"center", flexDirection:'row', justifyContent:"space-around", marginTop: 16}}>
      <TouchableOpacity onPress={()=>navigation.navigate("notes",{text})}>
        <Text>
          Submit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text>
          Cancel
        </Text>
      </TouchableOpacity>
      </View>

    </View>
    
  }
  