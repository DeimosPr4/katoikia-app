import React,{useState} from "react";
import {
  NativeBaseProvider, 
  Icon
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import RecoverPassword from "./components/RecoverPassword";
import Reservas from "./components/Reservas";
import Profile from "./components/Profile"; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AreaComun from "./components/AreaComun";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 



function HomeTab({route}) {

const [selected, setSelected] = useState(0);
const user = route.params;

// console.log(user);

  return (
    <Tab.Navigator initialParams={user} initialRouteName="Comunicados" > 
    <Tab.Screen  name="Comunicados" component={Home}  initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(0)}
     /> 
    <Tab.Screen  name="Reservas" component={Reservas } initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 1 ? 'tree' : 'tree-outline'} />} color="#D7A86E" size="md" />)} } onclick={() => setSelected(1)}  /> 
    <Tab.Screen  name="Perfil" component={Profile} initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 2 ? 'account' : 'account-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(2)} /> 
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
        <Stack.Screen name="area" component={AreaComun} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }}} />
      </Stack.Navigator>

    
    </NavigationContainer>
    </NativeBaseProvider>
  );
}