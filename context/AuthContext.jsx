import React from "react";
import { createContext,useState,useEffect } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

const [user, setuser] = useState(null)
const [LoggedIn, setLoggedIn] = useState(null)
const [role,setRole] = useState(null)


useEffect(() => {
// const authFunction = ()=>{


    const unsubscribeAuth = auth().onAuthStateChanged(async user => {
      if (user) {
        setLoggedIn(true);
        setuser(user)
        console.log('User is logged in:', user);
        const userRole  = (await firestore().collection("Users").doc(user.uid).get()).data().role
        setRole(userRole)
        // getDeviceToken(); // Get device token for notifications after login
      } else {
        setLoggedIn(false);
        console.log('No user is logged in');
      }
    });

    return unsubscribeAuth;
  
  }, [])
  

  return (
    <AuthContext.Provider value={{user,LoggedIn,setLoggedIn,setRole,role}}>
        {children}
    </AuthContext.Provider>
  )
}