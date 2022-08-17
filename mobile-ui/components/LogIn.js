import React from "react";
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
    marginBottom: 10
  }, 

  iconStyle: {
    padding: 10, 
  }, 

  viewSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  container: {

  }
})

export default function LogIn({navigation}) {
  return (
  
      
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Image source={
          logo
        } width={500} height={550}
    alt="Katoikia logo" size="xl" justifyContent="center" />

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
            <FormControl>
              <FormControl.Label> Correo Electrónico </FormControl.Label>

              <View style={styles.viewSection}> 
              <Entypo name="email" size={20} color="grey" style={styles.iconStyle} />
              <TextInput type="text" style={styles.input} />
              </View>
              
            </FormControl>
            <FormControl>
            <FormControl.Label> Contraseña </FormControl.Label>
                <View style={styles.viewSection}> 
                <MaterialCommunityIcons name="form-textbox-password" size={20} color="grey" style={styles.iconStyle}/>
                <TextInput type="password" style={styles.input} />
                </View>
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => navigation.navigate('Password')}
                
              >
             
                  Recuperar contraseña
               
              </Link>
            </FormControl>
            <Button  mt="2" backgroundColor="#D7A86E" onPress={() => navigation.navigate('Comunicados')}
            >
              <Text>Continuar</Text>
            </Button>
           
          </VStack></View>
          
        </Box>
      </Center>
  );


 
}