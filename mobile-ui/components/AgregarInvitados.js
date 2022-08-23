import React, { useContext, useState } from "react";
import { API } from "../environment/api";

import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack
} from "native-base";

import { StyleSheet, TextInput } from "react-native";
import { UserContext } from "../context/UserContext";

export default function AgregarInvitados({ navigation }) {

  const baseURL = `${API.BASE_URL}/guest/createGuest/`;
  const [name, setName] = useState(); 
  const [apellido, setApellido] =useState(); 
  const [dni, setDNI] = useState(); 
  const [phone, setPhone] = useState();
  const [number_plate, setNumber_plate] = useState();
  const [tenant_id, setTenant_id] = useState();
  const [community_id, setCommunity_id] = useState();
  const { user } = useContext(UserContext);

  const saveInvitado = async() => {

    const data = {
      "name": name,
      "last_name": apellido,
      "dni": dni,
      "phone": phone,
      "number_plate": number_plate,
      "tenant_id": user.id,
      "community_id": user.community_id
    }

    try {

      await fetch(baseURL, {

        cache: 'no-cache', 
        method: 'POST', 
        body: JSON.stringify(data), 
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
          Registrar invitado
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
         Registre el invitado que desee
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Nombre</FormControl.Label>
            <TextInput style={styles.input} type="text" onChangeText={(value) => setName(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Apellido</FormControl.Label>
            <TextInput style={styles.input} type="text" onChangeText={(value) => setApellido(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Identificación</FormControl.Label>
            <TextInput style={styles.input} type="text" onChangeText={(value) => setDNI(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Teléfono</FormControl.Label>
            <TextInput style={styles.input} type="text" onChangeText={(value) => setPhone(value)} />
          </FormControl>
          <Button mt="2" backgroundColor='tertiary.600' onPress={() => saveInvitado()}>
           Guardar
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
    margin: 3,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 9,
    paddingRight: 19,
    paddingBottom: 20,
    paddingLeft: 0,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 4
  }
})

