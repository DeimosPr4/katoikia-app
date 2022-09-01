import React, { useContext, useState } from "react";
import { API } from "../environment/api";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack,Select
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
  const [errors, setErrors] = useState({});
  const [categoria, setCategoria] = React.useState("");

  const [info, setInfo] = useState({
    name: "",
    last_name: "", 
    dni: "", 
    phone: "",
    number_plate:"", 
    status: "1", 
    tenant_id: user._id, 
    //tenant_id: "6301df20dac7dcf76dcecade", 
    community_id: user.community_id,
    //community_id: "62be68215692582bbfd77134",
    type_guest:""
  });

  const onHandleChange = (name) => (value) => setInfo(prev => ({...prev, [name]: value}))

  const validate = async() => {
      
    if( info.name === "" && info.last_name === "" && info.dni === "" && info.phone === ""){
      setErrors({ ...errors,
        name: 'Debe ingresar un nombre',
        last_name: 'Debe ingresar un apellido', 
        dni: 'Debe ingresar un número de identificación', 
        phone: 'Debe ingresar un número de teléfono'
      });
      return false;
    }else  if (info.name === "" ) {
      setErrors({ ...errors,
        name: 'Debe ingresar un nombre'
      });
      return false;
    } else if(info.last_name === ""){
      setErrors({ ...errors,
       
        last_name: 'Debe ingresar un apellido'
      });
      return false;
    }else if (info.dni === "") {
      setErrors({ ...errors,
        dni: 'Debe ingresar un número de identificación'
      });
      return false;
    }else if (info.phone === "") {
      setErrors({ ...errors,
        phone: 'Debe ingresar un número de teléfono'
      });
      return false;
    }
    
    return true;
  }

  const saveInvitado = async() => {
    const error = await validate(); 

    if (error) {
      try {

        await fetch(baseURL, {
  
          cache: 'no-cache', 
          method: 'POST', 
          body: JSON.stringify(info), 
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.status != 201){
            console.log('ocurrio un error ');
          }else{
            navigation.navigate('Inicio');
            return response.json(); 
          }
        })
        
      } catch (error) {
        console.log("ERROR: " + error);
      }
    }
   
    
  }
    return (
        <Center>

          <ScrollView width='100%' h='570' ml='36' _contentContainerStyle={{
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
        <VStack space={5} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Nombre</FormControl.Label>
            <TextInput style={'name' in errors ? styles.errorMessage : styles.input} type="text" onChangeText={onHandleChange("name")}/>
                    {'name' in errors && <FormControl.ErrorMessage  _text={{
              fontSize: 'xs'
            }}>Debe ingresar un correo electrónico</FormControl.ErrorMessage> }
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Apellido</FormControl.Label>
            <TextInput style={'last_name' in errors ? styles.errorMessage : styles.input} type="text" onChangeText={onHandleChange("last_name")}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Identificación</FormControl.Label>
            <TextInput style={'dni' in errors ? styles.errorMessage : styles.input}type="text" onChangeText={onHandleChange("dni")}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Teléfono</FormControl.Label>
            <TextInput style={'phone' in errors ? styles.errorMessage : styles.input}type="text" onChangeText={onHandleChange("phone")} />
          </FormControl>
          <FormControl >
            <FormControl.Label>Placa</FormControl.Label>
            <TextInput style={styles.input} type="text" onChangeText={onHandleChange("number_plate")} />
          </FormControl>
          <FormControl >
            <FormControl.Label>Tipo de invitado</FormControl.Label>
            
            <Select onChangeText={onHandleChange("type_guest")} selectedValue={categoria} minWidth="200" accessibilityLabel="Choose Service" placeholder="Elija el tipo de invitado" _selectedItem={{
        bg: "teal.600"
      }} mt={1} onValueChange={onHandleChange("type_guest")}>
          <Select.Item label="Invitado Frecuente" value="Frecuente" />
          <Select.Item label="Invitado de acceso rápido" value="Rapido" />
        </Select>


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
    height: 35,
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

