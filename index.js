/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType,AndroidImportance } from '@notifee/react-native';
import { displayNotification } from './components/utils/NotificationUtils';




messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await displayNotification()
});

notifee.onBackgroundEvent(async ({type,detail})=>{
  const {notification, pressAction} = detail;

  if(type === EventType.ACTION_PRESS && pressAction.id === 'acceptVisitor'){
    console.log("accepted")
  }
  else if(type === EventType.ACTION_PRESS && pressAction.id === "declineVisitor"){
    console.log("declined")
  }

  await notifee.cancelNotification(notification.id);


})


AppRegistry.registerComponent(appName, () => App);
