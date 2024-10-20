import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import PhoneInputScreen from './components/PhoneInputScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import GuardScreen from './components/GuardScreens/GuardScreen';
import AdminDashboard from './components/AdminDashboard';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuardTabNavigator from './components/GuardScreens/GuardTabNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { LoggedIn, role } = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(null);  // Initialize as null to track loading state

  const getStorage = async () => {
    try {
      const onboardedValue = await AsyncStorage.getItem('ONBOARDED');
      setOnboarded(JSON.parse(onboardedValue));
    } catch (error) {
      console.error('Error fetching onboarding state:', error);
    }
  };

  useEffect(() => {
    getStorage();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      const { notification, pressAction } = detail;

      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          if (pressAction.id === 'acceptVisitor') {
            console.log('Accept');
          } else if (pressAction.id === 'declineVisitor') {
            console.log('Decline');
          }
          break;
      }
    });
  }, []);

  const displayNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'Visitor-Request',
      name: 'Visitor Request',
      description: 'Visitor Request',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Visitor Access',
      body: 'Visitor access',
      android: {
        channelId: channelId,
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH,
        actions: [
          {
            title: 'Accept',
            pressAction: { id: 'acceptVisitor' },
          },
          {
            title: 'Decline',
            pressAction: { id: 'declineVisitor' },
          },
        ],
      },
    });
  };

  const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log('POST_NOTIFICATIONS permission status:', granted);
    }

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

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      await displayNotification();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Render a loading state if onboarding status is being fetched
  if (onboarded === null || LoggedIn === null || role === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="SplashScreen" >
        {LoggedIn ? (
          role === 'guard' ? (
            <Stack.Screen component={GuardTabNavigator} name="GuardTabNavigator" options={{headerShown:false}}/>
          ) : role === 'admin' ? (
            <Stack.Screen component={AdminDashboard} name="AdminDashboard" />
          ) : (
            <Stack.Screen component={Dashboard} name="Dashboard" />
          )
        ) : (
          !onboarded ? (
            <Stack.Screen
              name="OnboardingScreen"
              options={{ headerShown: false }}
              setOnboarded={setOnboarded}
            >
              {props => <OnboardingScreen {...props} setOnboarded={setOnboarded} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              component={AuthScreen}
              name="AuthScreen"
              options={{ headerShown: false }}
            />
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
