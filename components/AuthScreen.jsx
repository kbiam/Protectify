import React, { useState,useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from '../context/AuthContext';
// import Feather from 'react-native-vector-icons/Feather';



const AuthScreen = () => {
  const [flatNumber, setFlatNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("")
  // const [LoggedIn, setLoggedIn] = useState(false);
  const {LoggedIn,setLoggedIn,setRole} = useContext(AuthContext)

  // useEffect(() => {
  //   // Request notification permissions when the app launches
  //   requestUserPermission();
    
  //   // Check if user is already logged in
  //   // const unsubscribeAuth = auth().onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     setLoggedIn(true);
  //   //     console.log('User is logged in:', user.uid);
  //   //     // getDeviceToken(); // Get device token for notifications after login
  //   //   } else {
  //   //     setLoggedIn(false);
  //   //     console.log('No user is logged in');
  //   //   }
  //   // });

  //   const unsubscribeTokenRefresh = messaging().onTokenRefresh(async token => {
  //     console.log('Device FCM Token refreshed:', token);
  //     const user = auth().currentUser;
  //     if (user) {
  //       await updateFirestoreWithToken(user.uid, token);
  //     }
  //   });


  //   return () => {
  //     // unsubscribeAuth();
  //     unsubscribeTokenRefresh(); }
  // }, []);


  const logoutUser = async()=>{
    await auth().signOut();
  }
  const registerUser = async(flatNumber,email,password)=>{
    const societyID = "SocietyA"
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email,password)
      const uid = userCredential.user.uid;  
      const userDoc =  firestore().collection('Users').doc(uid); // Use UID as the Firestore document ID
      await userDoc.set({
          flatNumber:  `${flatNumber}`,
          email:email,
          societyID: societyID,
          role: 'guard',
          fcmToken:"",

      });
      await firestore().collection('Societies').doc(societyID).update({
        guardIDs:firestore.FieldValue.arrayUnion(uid)
      })
      // await houseDoc.set({
      //   houseNumber : flatNumber,
      //   floor:"",
      //   block:"",
      //   members:[uid],
      //   status:"occupied"
      // })
    } catch (error) {
      Alert.alert(error.message)
    }
  }
  const handleLogin = async () => {
    try {
      // const formattedEmail = `${flatNumber}@example.com`; // Use flat number as formatted email
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      const userDoc = (await firestore().collection("Users").doc(user.uid).get()).data().role
      setRole("guard")
      setLoggedIn(true);
      console.log('Login successful');
      // await auth().setP
      await getDeviceToken(); // Get device token after successful login
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  };

  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();  // Get device token

      // Ensure token is valid
      if (!token || typeof token !== 'string') {
        console.error('Invalid token:', token);
        return;
      }

      const user = auth().currentUser;
      if (!user || !user.uid) {
        console.log('No logged-in user found');
        return;
      }

      console.log('Device FCM Token:', token);
      await updateFirestoreWithToken(user.uid, token);  // Update Firestore with the device token
    } catch (error) {
      console.error('Failed to get device token:', error);
    }
  };

  const updateFirestoreWithToken = async (uid, token) => {
    try {
      const userDoc = firestore().collection('Users').doc(uid);
      await userDoc.update({
        fcmToken:token
      })
      

      // if (!devices.includes(token)) {
      //   await firestore().collection('Flats').doc(uid).update({
      //     devices: firestore.FieldValue.arrayUnion(token),
      //   });
      //   console.log('Device token added to Firestore');
      // } else {
      //   console.log('Token already exists in Firestore');
      // }
    } catch (error) {
      console.error('Failed to update Firestore with token:', error);

    }
  }


  const removeDeviceToken = async (token) => {
    const user = auth().currentUser;
    if (user) {
      await firestore().collection('Flats').doc(user.uid).set({
        devices: firestore.FieldValue.arrayRemove(token), // Remove token from array
      }, { merge: true });
    }
  };
  


  return (
    <View style={{display:'flex',flex:1,justifyContent:"center",alignItems:"center",padding:30,gap:15,backgroundColor:"#FFFFFF"}}>
      <Text style={{color:"black",fontSize:25,fontWeight:"600",textAlign:"left",marginBottom:20}}>SIGN IN</Text>
      {/* <Text>Flat Number</Text> */}
      {/* <Icon name='user' size={30} /> */}
      <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:20}}>

      <TextInput
        placeholder="Flat Number"
        value={flatNumber}
        onChangeText={setFlatNumber}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputBox}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.inputBox}
        secureTextEntry={true}
      />

      </View>
      <Pressable style={{width:"90%"}}><Text style={{color:"#6A707B",fontWeight:"500",textAlign:"right"}}>Forgot Password?</Text></Pressable>



      <Button title="Register" onPress={() => registerUser(flatNumber,email, password)} />
        <Pressable onPress={()=>handleLogin()} style={styles.loginButton}>
          <Text style={{color:"white",textAlign:"center",fontWeight:"500",fontSize:17}}>Login</Text>
        </Pressable>
      <Button title="Logout" onPress={logoutUser} />
      <Button title="token" onPress={getDeviceToken} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox:{
    backgroundColor:"#F7F8F9",
    // borderWidth:1,
    // borderColor:"#e3e3e3",
    borderRadius:10,
    width:"90%",
    display:"flex",
    padding:15,
    fontSize:15,
    fontWeight:"400",
    paddingHorizontal:20
    
  },
  loginButton:{
    backgroundColor:"#1E232C",
    width:"90%",
    borderRadius:10,
    padding:17,
    fontSize:15,
    fontWeight:"500",
    
  }
})

export default AuthScreen;
