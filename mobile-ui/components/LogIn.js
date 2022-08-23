import React, { useContext, useState } from "react";
import Cookies from 'universal-cookie';
import {
  Text,
  Link,
  Center,
  Heading,
  VStack,
  Box,
  FormControl,
  Button,
  Image
} from "native-base";
import logo from "../assets/logo-katoikia.png";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";

const baseURL = `${API.BASE_URL}/user/loginUser`;

export default function LogIn({ navigation }) {

  const { addUser } = useContext(UserContext);

  const [credentials, setCredentials] = useState({
    email: "lalo@lalo.com",
    password: "12345"
  });

  const onHandleChange = (name) => (value) => setCredentials(prev => ({ ...prev, [name]: value }))

  const iniciarSesion = async () => {
    try {
  
      console.log(baseURL);
      await fetch(baseURL, {
        cache: 'no-cache', 
        method: 'POST', 
        body: JSON.stringify(credentials), 
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
      .then( response => {

        // inqulino 4 y guarda 63
         const user = response.message
          if(user.user_type == '4'){
            addUser(user);

            navigation.navigate('Comunicados', {user})
          }else if(user.user_type == '3'){
            addUser(user);
            navigation.navigate('Comunicados', {user})
          }
      })
      
    } catch (error) {
      console.log("ERROR: " +error);
    }

  }

  return (

    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">

        <Center>
          <Image source={
            logo
          } width={500} height={550} m='2'
            alt="Katoikia logo" size="xl" justifyContent="center" />

        </Center>

        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bienvenido a Katoikia
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Su app de comunidad de confianza
        </Heading>

        <View style={styles.container}>
          <VStack space={3} mt="5">
            <FormControl isRequired >
              <FormControl.Label Text='bold'> Correo Electrónico </FormControl.Label>

              <View style={styles.viewSection}>
                <Entypo name="email" size={20} color="grey" style={styles.iconStyle} />
                <TextInput
                  name='email'
                  type="text"
                  style={styles.input}
                  value={credentials.email}
                  placeholder='Correo electrónico'
                  onChangeText={onHandleChange("email")} />
              </View>

            </FormControl>
            <FormControl isRequired>
              <FormControl.Label Text='bold'> Contraseña </FormControl.Label>
              <View style={styles.viewSection}>
                <MaterialCommunityIcons name="form-textbox-password" size={20} color="grey" style={styles.iconStyle} />
                <TextInput
                  name='password'
                  type="password"
                  style={styles.input}
                  value={credentials.password}
                  placeholder='Contraseña'
                  onChangeText={onHandleChange("password")} />
              </View>
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                  marginTop: "10"
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => navigation.navigate('Password')}

              >

                Recuperar contraseña

              </Link>
            </FormControl>
            <Button mt="2" backgroundColor="#D7A86E" onPress={iniciarSesion}
            >
              <Text>Continuar</Text>
            </Button>

          </VStack></View>

      </Box>
    </Center>
  );

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 4
  },

  iconStyle: {
    paddingBottom: 20,
    marginTop: 3,
    paddingTop: 35
  },

  viewSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 28
  },

  container: {

  }
})
