
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabMenu from "./src/components/TabMenu"
import AuthFrom from "./src/components/AuthForm/authForm"

const isAuth = false

export default function App() {
  return (
    <NavigationContainer>
      {isAuth ? ( <TabMenu/>) : (<AuthFrom/>)}
    
    </NavigationContainer>
  );
}


