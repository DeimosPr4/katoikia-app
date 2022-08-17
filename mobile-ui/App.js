import React from "react";
import {
  NativeBaseProvider
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import RecoverPassword from "./components/RecoverPassword";
import Reservas from "./components/Reservas";
import Profile from "./components/Profile"; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 


function HomeTab() {

  return (
    <Tab.Navigator initialRouteName="Comunicados" > 
    <Tab.Screen  name="Comunicados" component={Home} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }}}/> 
    <Tab.Screen  name="Reservas" component={Reservas } options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }}}/> 
    <Tab.Screen  name="Perfil" component={Profile} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }}}/> 
  </Tab.Navigator>
  )
}
export default function App() {
  return (
    <NativeBaseProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="Inicio" component={LogIn} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }}} />
        <Stack.Screen name="Comunicados" component={HomeTab} options={{headerShown: false}} />
        <Stack.Screen name="Password" component={RecoverPassword} />
      </Stack.Navigator>

    
    </NavigationContainer>
    </NativeBaseProvider>
  );
}