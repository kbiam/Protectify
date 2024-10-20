import React, { useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import { AuthProvider } from './context/AuthContext';
import MainNavigator from './MainNavigator'; // Import the new file

const firebaseConfig = {
  apiKey: "AIzaSyCkxV1_bIZF_6S17_SxMdyQz71PIKnbgeY",
  authDomain: "secuirtyapp-4a065.firebaseapp.com",
  projectId: "secuirtyapp-4a065",
  messagingSenderId: "351144536196",
  appId: "1:351144536196:android:aabdd7097453ea3d947ad1",
};

export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("Firebase initialized.");
    } else {
      console.log("Firebase already initialized.");
    }
  }, []);

  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
