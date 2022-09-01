import React, { useContext, useState } from "react";
import {
  NativeBaseProvider,
  Icon
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import RecoverPassword from "./components/RecoverPassword";
import Reservas from "./components/Reservas";
import Profile from "./components/Profile";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AreaComun from "./components/AreaComun";
import { UserContext, UserContextProvider } from "./context/UserContext";
import AgregarInvitados from "./components/AgregarInvitados";
import Invitados from "./components/Invitados"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab({ route }) {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(0);

  return (

    <Tab.Navigator initialParams={user} initialRouteName="Comunicados" > 
    <Tab.Screen  name="Mis Comunicados" component={Home}  initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(0)}
     /> 
    <Tab.Screen  name="Mis Reservas" component={Reservas } initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 1 ? 'tree' : 'tree-outline'} />} color="#D7A86E" size="md" />)} } onclick={() => setSelected(1)}  /> 
        <Tab.Screen  name="Mis Invitados" component={Invitados} initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 1 ? 'contacts' : 'contacts-outline'} />} color="#D7A86E" size="md" />)} } onclick={() => setSelected(1)}  /> 
    <Tab.Screen  name="Perfil" component={Profile} initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 2 ? 'account' : 'account-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(2)} /> 
  </Tab.Navigator>

  )
}

function HomeTabGuarda({ route }) {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(0);

  return (

    <Tab.Navigator initialParams={user} initialRouteName="Comunicados" > 
    <Tab.Screen  name="Mis Comunicados Guarda" component={Home}  initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(0)}
     />
    <Tab.Screen  name="Mis Invitados" component={Invitados} initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 1 ? 'contacts' : 'contacts-outline'} />} color="#D7A86E" size="md" />)} } onclick={() => setSelected(1)}  /> 
    <Tab.Screen  name="Mi Perfil" component={Profile} initialParams={user} options={{headerStyle: {
      backgroundColor: "#D7A86E"
    }, tabBarIcon: () => (<Icon mb="2" as={<MaterialCommunityIcons name={selected === 2 ? 'account' : 'account-outline'} />} color="#D7A86E" size="md" />)}} onclick={() => setSelected(2)} /> 
  </Tab.Navigator>

  )
}
export default function App() {
  return (
    <NativeBaseProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Iniciar Sesión">
            {/* <Stack.Screen name="Mis Reservas" component={Reservas} options={{
              headerStyle: {
                backgroundColor: "#D7A86E"
              }
            }} /> */}
            <Stack.Screen name="Comunicados" component={HomeTab} options={{ headerShown: false }} />
            <Stack.Screen name="Comunicados Guarda" component={HomeTabGuarda} options={{ headerShown: false }} />
          
            <Stack.Screen name="Reservar" component={AreaComun} options={{
              headerStyle: {
                backgroundColor: "#D7A86E"
              }
            }} />
             <Stack.Screen name="Agregar Invitado" component={AgregarInvitados} options={{
              headerStyle: {
                backgroundColor: "#D7A86E"
              }
            }} />
            <Stack.Screen name="Iniciar Sesión" component={LogIn} options={{
              headerStyle: {
                backgroundColor: "#D7A86E"
              }
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </NativeBaseProvider>
  );
}
