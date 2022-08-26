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
  Image, 
  ErrorMessage
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
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const onHandleChange = (name) => (value) => setCredentials(prev => ({ ...prev, [name]: value }))

  const validate = async() => {
      
    if( credentials.email === "" && credentials.password === ""){
      setErrors({ ...errors,
        email: 'Debe ingresar un correo electrónico',
        password: 'Debe ingresar una contraseña'
      });
      return false;
    }else  if (credentials.password === "") {
      setErrors({ ...errors,
        password: 'Debe ingresar una contraseña'
      });
      return false;
    } else if(credentials.email === ""){
      setErrors({ ...errors,
        email: 'Debe ingresar un correo electrónico'
      });
      return false;
    }
    
    return true;
  }

  const iniciarSesion = async () => {

    const error = await validate(); 

    console.log(error);

   if (error) {
    try {
  
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

        // inqulino 4 y guarda 3
         const user = response.message

         if(user !== null){
          if(user.user_type == '4'){
            addUser(user);

            navigation.navigate('Comunicados', {user})
          }else if(user.user_type == '3'){
            addUser(user);
            // cambiar por ComunicadosGuarda luego
            navigation.navigate('Comunicados', {user})
          }
         }else{
          setErrors({ ...errors,
            user: 'Debe ingresar credenciales válidos'
          });
         }
          
      })
      
    } catch (error) {
      console.log("ERROR: " +error);

    }
    
   }
   
   console.log(errors);
  }

  return (

    <Center w="100%" flex={1}>
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
          <VStack width="90%" mx="3" maxW="300px" mb={10}>
            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label Text='bold'> Correo Electrónico </FormControl.Label>

              <View style={styles.viewSection}>
                <Entypo name="email" size={20} color="grey" style={styles.iconStyle} />
                <TextInput 
                  name='email'
                  type="text"
                  style={'email' in errors ? styles.errorMessage : styles.input}
                  value={credentials.email}
                  placeholder='Correo electrónico'
                  onChangeText={onHandleChange("email")} />
                
              </View>
              {'email' in errors && <FormControl.ErrorMessage  _text={{
        fontSize: 'xs'
      }}>Debe ingresar un correo electrónico</FormControl.ErrorMessage> }
            </FormControl>

            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label Text='bold'> Contraseña </FormControl.Label>
              <View style={styles.viewSection}>
                <MaterialCommunityIcons name="form-textbox-password" size={20} color="grey" style={styles.iconStyle} />
                <TextInput
                  name='password'
                  type="password"
                  style={'password' in errors ? styles.errorMessage : styles.input}
                  value={credentials.password}
                  placeholder='Contraseña'
                  onChangeText={onHandleChange("password")} />
                   
              </View>
              {'password' in errors && <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}
      >Debe ingresar una contraseña</FormControl.ErrorMessage> }
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
                      {/* {'user' in errors && <ErrorMessage _text={{
                  fontSize: 'xs'
                }}
                >Debe ingresar credenciales válidos</ErrorMessage> } */}

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
    paddingLeft: 0,
    marginTop: 50,
    borderRadius: 4
  },
  errorMessage: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 0,
    marginTop: 50,
    borderRadius: 4, 
    borderColor: '#be123c'
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
    marginBottom: 50
  },

  container: {
    marginBottom: 6

  }
})
