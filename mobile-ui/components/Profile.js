import React, { useState } from "react";

import {
    Box, 
    Heading, 
    VStack, 
    FormControl,  
    Button,
    Center,
    ScrollView
  } from "native-base";

  import { View, TextInput, StyleSheet } from "react-native";

export default function Profile({route, navigation}){



  const baseURL = 'http://localhost:4000/user/updateUser'
  const userData = JSON.parse(JSON.stringify(route.params));
  const [name, setName] = useState(); 
  const [apellido, setApellido] =useState(); 
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState();

  console.log(userData.user);


  const updateInfo = async() => {

    try {

      await fetch(baseURL, {
        cache: 'no-cache', 
        method: 'PUT', 
        body: JSON.stringify(userData), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
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
        <Center>

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
          <FormControl>
            <FormControl.Label>Teléfono</FormControl.Label>
            <TextInput type="text" defaultValue={userData.user.phone} editable={false} />
          </FormControl>
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
          <FormControl>
            <FormControl.Label>Contraseña actual</FormControl.Label>
            <TextInput style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) }/>
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
        </Center>
       
    )

   
}

const styles = StyleSheet.create({
  input: {
    height: 10,
    margin:3,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 9,
    paddingRight: 19,
    paddingBottom: 20,
    paddingLeft: 0,
    marginTop: 6, 
    marginBottom:6, 
    borderRadius: 4
  }
  })

