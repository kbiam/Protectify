import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

export default function Dashboard() {

  const resetPassword = async()=>{
    try {
      await auth().sendPasswordResetEmail("kushbang123@gmail.com");
      console.log('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email: ', error);
    }
    }
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title='reset' onPress={resetPassword}/>
    </View>
  )
}

const styles = StyleSheet.create({})