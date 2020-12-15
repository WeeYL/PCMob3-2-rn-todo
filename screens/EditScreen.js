import React, {useEffect,useState} from 'react'
import {View, Text, FlatList, TouchableOpacity,TextInput} from "react-native"
import styles, {navigationStyle} from '../stylesheet'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("notes.db")



export default function EditScreen({navigation, route}){

    const [text, setText] = useState(route.params.title)
    const [newEdit, setNewEdit] = useState(route.params.edit)

    // edit note function
    function editNote() {
      if (text) {
        db.transaction(
          (tx) => {
            tx.executeSql(`
            UPDATE notes 
            SET title = ? 
            WHERE id= ?`, [text,route.params.id]);
          },
          null,

          )
      }
      
      console.log(newEdit)
      console.log("...")
      navigation.navigate('notes', {newEdit})
    }


    // useeffect send newEdit when text is updated
    useEffect(console.log("test"), [text])

    return <View style={styles.container}>

      <Text style={{fontSize:20, color: "blue"}}>
        Edit task
      </Text>


      <TextInput style={{padding:10, textAlignVertical: 'top', height: 80, width:"90%", borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text=>setText(text)}
      defaultValue={route.params.title}
      multiline={true}>
      </TextInput>

      <View style={{ borderColor: 'gray', borderWidth: 1,width:"90%",alignItems:"center", flexDirection:'row', justifyContent:"space-around", marginTop: 16}}>
      <TouchableOpacity onPress={editNote}>
        <Text>
          Save
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
  