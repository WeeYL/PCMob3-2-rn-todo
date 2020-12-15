import React, {useEffect,useState} from 'react'
import {View, Text, FlatList, TouchableOpacity,TextInput, Button} from "react-native"
import styles, {navigationStyle} from '../stylesheet'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("notes.db")

export default function EditScreen({navigation, route}){

    const [editText, setEditText] = useState(route.params.title)

    // edit note function
    function editNote() {

      if (editText) {
        db.transaction(
          (tx) => {
            tx.executeSql(`
            UPDATE notes 
            SET title = ? 
            WHERE id= ?`, [editText,route.params.id]);
          },
          )
      }
       // navigate back to notes
      navigation.navigate('notes',{editText})
    }

    return <View style={styles.container}>
      <Text style={{fontSize:20, color: "blue"}}>
        Edit task
      </Text>

      <TextInput style={{padding:10, textAlignVertical: 'top', height: 80, width:"90%", borderColor: 'gray', borderWidth: 1 }}
      onChangeText={editText=>setEditText(editText)}
      defaultValue={route.params.title}
      multiline={true}>
      </TextInput>

      <View style={{ borderColor: 'gray', borderWidth: 1,width:"90%",alignItems:"center", flexDirection:'row', justifyContent:"space-around", marginTop: 16}}>
      <TouchableOpacity onPress={editNote}>
        <Text>
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.goBack() }>
        <Text>
          Cancel
        </Text>
      </TouchableOpacity>
      </View>

    </View>
    
  }
  