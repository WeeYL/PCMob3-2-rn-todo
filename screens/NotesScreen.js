import React, {useEffect,useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, Alert} from "react-native"
import styles, {navigationStyle} from '../stylesheet'
import { AntDesign } from '@expo/vector-icons'; 
import * as SQLite from "expo-sqlite"
import * as FileSystem from "expo-file-system";

// create database
const db = SQLite.openDatabase("notes.db")

console.log(FileSystem.documentDirectory);
    
export default function NotesScreen({navigation, route}) {

  // useState
      const [notes, setNotes] = useState([])


  // toggle edit change
  useEffect(() => {
    if(route.params?.editText){
      refreshNotes()
    }
  }, [route.params?.editText])
    



  // useEffect on creating database on first login
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          done INT)
        `
        );
      },
      null,
      refreshNotes
    );
  }, []);
  

  // refresh display function
    function refreshNotes() {

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes
        ORDER BY id DESC
        `,
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log(`Error: ${error}`)
      );
    });
  }



  // useEffect upon submit, insert data into dataase

    useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);
  
  // delete
  function deleteItem(item){
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=${item};
       `);
      },
      null,
      refreshNotes
    );}
    
    // delete all
    function deleteAll(){

      Alert.alert(
        "Delete All?",
        "Sure?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>  {
            db.transaction(
              (tx) => {
                tx.executeSql(`DELETE from notes;
                `);
              },
              null,
              refreshNotes
            );
          } }
        ],
        { cancelable: false }
      );
    }
  
     // function renderItem
    function renderItem({item}){
      return(
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:20, borderBottomColor:"gray", borderBottomWidth:1}}>
          <Text >
   
            {item.title}
          </Text>

          <View style={{flexDirection:"row", width:60,}}>

            <TouchableOpacity style={{marginRight:20}} onPress={()=>{navigation.navigate('edit notes',{...item})}}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>

            
            <TouchableOpacity onPress={()=>{
              Alert.alert(
                "Task completed and delete?",
                "Sure?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () =>  deleteItem(id=item.id) }
                ],
                { cancelable: false }
              );
            }}>
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
            
          </View>

        </View>
      )
    }

    // UseEffect Add addfile header alway refresh
    useEffect(()=>{
      navigation.setOptions({
        headerRight:()=>(
          <View>

            <TouchableOpacity style={{marginRight:20}} onPress={()=>navigation.navigate('add notes')}>
              <AntDesign name="pluscircleo" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={{marginRight:20}} onPress={deleteAll}>
            <Text style={{color:"white"}}>
              clear all
            </Text>
          </TouchableOpacity>

          </View>

          
        ),
   

          headerLeft:()=>(
            <View style={{ paddingLeft: 10, display:"flex", flexDirection:"column"}}>
            <Text style={{color:"white"}}>
              {notes.length} 
            </Text>
            <Text style={{color:"white"}}>
              things
            </Text>
            </View>
          )
        
      })
      
    })
            
    return(
      // create screen
      <View style={styles.container}>
        <FlatList data={notes}
          style={{ width: "100%"}}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id.toString()}
          />
        
      </View>
    )
  }
  