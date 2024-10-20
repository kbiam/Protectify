import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';



export default function PhoneInputScreen({navigation}) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSendOTP = async ()=>{
        if (phoneNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid phone number.');
            return;
          }

        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
            console.log(confirmation)
        } catch (error) {
            console.log(error)
            Alert.alert("erro")
        }
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Enter Your Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1234567890"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Button title="Send OTP" onPress={handleSendOTP} />
        </View>
      );
    };
    
const styles = StyleSheet.create({
      container: { flex: 1, justifyContent: 'center', padding: 16 },
      title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
      input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 },
    });
    