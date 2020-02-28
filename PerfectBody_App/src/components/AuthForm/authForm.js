import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import DiaryScreen from "../DiaryScreen";
import CulcScreen from "../CulcScreen";




const Tab = createMaterialBottomTabNavigator();


function AuthFrom() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#e1f500"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Login"
        component={DiaryScreen}
        options={{
          headerTitle: "Login",
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
        <Tab.Screen
        name="Regist"
        component={CulcScreen}
        options={{
          tabBarLabel: 'Regist',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="new-box" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
export default AuthFrom;