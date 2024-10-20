import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VisitorCheckInScreen from './VisitorCheckInScreen';
import VisitorLogScreen from './VisitorLogScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Notifications from './Notifications';

const Tab = createBottomTabNavigator();

const GuardTabNavigator = () => {
  return (
    <Tab.Navigator
    
      screenOptions={
        ({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;

          if(route.name === 'CheckIn'){
            iconName = focused ? 'log-in':'log-in-outline';
          }
          else if(route.name === 'VisitorLog'){
            iconName = focused?'list':'list-outline';
          }
          else if(route.name === 'Profile'){
            iconName = focused ? 'settings' : 'settings-outline';

          }
          else if(route.name === "Notifications"){
            iconName = focused? 'notifications':'notifications-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;

        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{
          height:60,
          position:"absolute",
          bottom:16,
          left:16,
          right:16,
          borderRadius:16,
          
        },
        tabBarShowLabel:false,
        // headerShown:false
        headerStyle:{
          height:100,
          
        },
        headerTitleStyle:{
        }

      })}
    >
      <Tab.Screen name="CheckIn" component={VisitorCheckInScreen} options={{ title: 'Check In Visitor' }}  />
      <Tab.Screen name="VisitorLog" component={VisitorLogScreen} options={{ title: 'Visitor Log' }} />
      <Tab.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      
    </Tab.Navigator>
  );
};

export default GuardTabNavigator;
