import React from "react";
import {
  NativeBaseProvider
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import RecoverPassword from "./components/RecoverPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="Inicio" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Password" component={RecoverPassword} />
      </Stack.Navigator>
    </NavigationContainer>
      
    </NativeBaseProvider>
  );
}