import { StyleSheet, Text, View,Button, Touchable, Pressable } from 'react-native'
import React from 'react'
import notifee,{AndroidImportance, EventType} from '@notifee/react-native';
import { useEffect } from 'react';


export default function GuardScreen() {
  const displayNotification =async ()=>{
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance:AndroidImportance.HIGH
    });
    const channelId2 = await notifee.createChannel({
      id:"high",
      name:"high",
      importance:AndroidImportance.HIGH,
      vibration:true
    })

    await notifee.displayNotification({
      title:"Visitor Access",
      body:"Kush wants to visit your flat",
      android:{
        channelId:channelId2,
        smallIcon: 'ic_launcher',
        color: '#4CAF50',
        importance:AndroidImportance.HIGH,
        priority: AndroidImportance.HIGH, // Explicitly set priority

        actions:[
          {
            title:"Accept",
            pressAction:{id:"accept"}
          },
          {
            title:"Decline",
            pressAction:{id:"decline"},
          }
        ]
      }
    })
  }


  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <View style={{flexDirection:"row",gap:15}}>
      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Add new Visitor</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Visitor Log</Text>
      </Pressable>
      </View>

      {/* <Text>GuardScreen</Text> */}
      {/* <Button title='showNoti'onPress={displayNotification}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:"#1E232C",
    borderRadius:7,
    padding:15,
    width:"40%"
  },
  btnText:{
    color:"white",
    fontSize:15,
    fontWeight:"600"
  }
})