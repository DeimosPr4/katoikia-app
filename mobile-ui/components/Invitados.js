import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";
import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack,FlatList, HStack,Avatar,Spacer,Text, Icon
} from "native-base";

export default function Invitados({navigation}) {


  const [isRequesting, setIsRequesting] = useState(false);
  const [invitados, setInvitados] = useState([]);
  const { user } = useContext(UserContext);
  const id = user._id;
  //const id = "6301df20dac7dcf76dcecade";
  const user_type=user.user_type;
  //const user_type="4";
  //const community_id="1";
  const community_id=user.community_id;
  const [invitado, setInvitado] = useState([]);

  useEffect(() => {

    const onRequestInvitadosData = async () => {
      setIsRequesting(true);

      try {
        if(user_type=="3"){
          const jsonResponse = await fetch(`${API.BASE_URL}/guest/findGuestCommunity/`+`${community_id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const response = await jsonResponse.json();
          setInvitados(response.message);
        }else if(user_type=="4"){
          const jsonResponse = await fetch(`${API.BASE_URL}/guest/findGuestUser/`+`${id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const response = await jsonResponse.json();
          setInvitados(response.message);
        }
      } catch (error) {

      }

      setIsRequesting(false)
    }

    onRequestInvitadosData()

  })

  const deleteInvitado = async(pid) => {
    const data = {
      "_id": pid
    }

    try {

      await fetch("http://localhost:4000/guest/updateGuest", {

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
  
       <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Lista de invitados
      </Heading>
      <Button width='200' mb="4"  mt="4" ml='85' backgroundColor='tertiary.600' onPress={() => navigation.navigate('Agregar Invitado')}  icon={<Icon mb="0.5" as={<MaterialCommunityIcons name={'plus'} />} color="white" size="sm" />}>
        Agregar invitado
       </Button>
      <FlatList data={invitados} renderItem={({
      item
    }) => <Box key={item._id} borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between" >
            <MaterialCommunityIcons name="account" size={48} color="#D7A86E" />
              <VStack key={item._id}>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.name+" "+item.last_name}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {"Identificación: "+item.dni}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                 {"Teléfono: "+item.phone}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                 {"Número Placa: "+item.number_plate}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                 {"Tipo de acceso: "+item.type_guest}
                </Text>

              </VStack>
              <Spacer />
              {user_type == 3 && <MaterialCommunityIcons name="delete" size={28} color="#7C0808" onPress={() =>{deleteInvitado(item._id)}} />}
            </HStack>
          </Box>} keyExtractor={item => item.id} />
    </Box>
      

  );

  

 
}