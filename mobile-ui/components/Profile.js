import React, { useContext, useState } from "react";
import { API } from "../environment/api";
import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack
} from "native-base";
import { Dimensions, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import { UserContext } from "../context/UserContext";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { stringMd5 } from 'react-native-quick-md5';


const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function Profile({ navigation }) {

  const baseURL = `${API.BASE_URL}/user/updateUser/`
  const [name, setName] = useState(); 
  const [apellido, setApellido] =useState(); 
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState();
  const [index, setIndex] = useState(0); 
  const layout = useWindowDimensions(); 
  const userData = useContext(UserContext)
  const id = userData.user._id;
  const decode = userData.Password; 
  const [error, setError] = useState({}) 

  console.log(userData.user);

  const onHandleChangePassword = (value) => {
    //console.log(value);
    const dpassword = stringMd5(value)
    console.log(dpassword);


    console.log(userData.user.password);
    if (userData.user.password == dpassword) {
      console.log(true);
    }else{
      console.log(false);
      setError({ ...error,
        
        password: 'La contraseña no coincide con la actual'
      });
    }
  }

  const ProfileView = () => (

    <ScrollView width='100%' h='550' ml='36' _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
             <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Bienvenido {userData.user.name}
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Modifique sus datos
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>DNI</FormControl.Label>
            <TextInput type="text" defaultValue={userData.user.dni} editable={false} />
          </FormControl>
          {/* <FormControl>
            <FormControl.Label>Teléfono</FormControl.Label>
            <TextInput type="text" defaultValue={userData.user.phone} editable={false} />
          </FormControl> */}
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <TextInput style={styles.input} type="text" defaultValue={userData.user.name} onChangeText={(value) => setName(value) }/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <TextInput style={styles.input} type="text"defaultValue={userData.user.last_name} onChangeText={(value) => setApellido(value) } />
          </FormControl>
          <FormControl>
            <FormControl.Label>Correo electrónico</FormControl.Label>
            <TextInput style={styles.input} type="text" defaultValue={userData.user.email} onChangeText={(value) => setEmail(value) }/>
          </FormControl>
          <Button mt="2" backgroundColor="orange.300" onPress={() => updateInfo()}>
            Actualizar
          </Button>
          <Button mt="6" colorScheme="error" onPress={() => navigation.navigate('Inicio')}>
            Cerrar sesión
          </Button>
        </VStack>
      </Box>

      </ScrollView>

  )

  const PasswordView = () => (

    <ScrollView width='100%' h='550' ml='36' _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}> 

    <Box safeArea p="2" w="90%" maxW="290" py="8"> 
    <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Bienvenido {userData.user.name}
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Modifique sus contraseña
        </Heading>

        <VStack space={3} mt="5"> 
        <FormControl>
            <FormControl.Label>Contraseña actual</FormControl.Label>
            <TextInput style={'password' in error ? styles.errorMessage : styles.input} type="password" defaultValue="" onChangeText={(value) => onHandleChangePassword(value) }/>
          </FormControl>
       
          <FormControl>
            <FormControl.Label>Nueva Contraseña</FormControl.Label>
            <TextInput editable={!error} style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) } />
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirmar nueva contraseña</FormControl.Label>
            <TextInput editable={!error} style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) }/>
          </FormControl>

          <Button mt="2" backgroundColor="orange.300" onPress={() => updateInfo()} disabled={error}>
            Actualizar contraseña
          </Button>

             {/* {'password' in error && <FormControl.ErrorMessage  _text={{
        fontSize: 'xs'
                }}>La contraseña no coincide con la actual</FormControl.ErrorMessage> } */}
          
        </VStack>
    </Box>


    </ScrollView>
    
  )

  const updatePassword = async() =>{

  }
  
  const updateInfo = async() => {

    const data = {
      "_id": "6301df20dac7dcf76dcecade",
      "dni": "1234567890",
      "name": name,
      "last_name": apellido,
      "email": email,
      "phone": 12121212,
      "password": "827ccb0eea8a706c4c34a16891f84e7b",
      "user_type": "3",
      "status": "1",
      "date_entry": "2022-08-21T07:30:09.929Z",
      "community_id": null,
    }

    try {

      await fetch(baseURL+`${id}`, {

        cache: 'no-cache', 
        method: 'PUT', 
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {

        console.log(baseURL+`${id}`);
        if (response.status != 201){
          console.log('ocurrio un error ');
        }else{
          return response.json(); 
        }
      })
      
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }



    return (
     
          <Navigator>
            <Screen name="Perfil" component={ProfileView} />
            <Screen name="Contraseña" component={PasswordView} />
        
          </Navigator>

  )


}

const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 3,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 9,
    paddingRight: 19,
    paddingLeft: 0,
    marginTop: 6,
    borderRadius: 4
  }, 
  errorMessage: {
    height: 35,
    margin: 3,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 9,
    paddingRight: 19,
    paddingLeft: 0,
    marginTop: 6,
    borderRadius: 4, 
    borderColor: '#be123c'
  }
})

