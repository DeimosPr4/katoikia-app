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


  useEffect(() => {

    const onRequestInvitadosData = async () => {
      setIsRequesting(true);

      try {
        const jsonResponse = await fetch(`${API.BASE_URL}/guest/findGuestUser/`+`${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await jsonResponse.json();
        //console.log(response);
        setInvitados(response.message);

      } catch (error) {

      }

      setIsRequesting(false)
    }

    onRequestInvitadosData()

  })

  return (
  
       <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Lista de invitados
      </Heading>
      <Button width='200' mb="4"  mt="4" ml='85' backgroundColor='tertiary.600' onPress={() => navigation.navigate('invitado')}  icon={<Icon mb="0.5" as={<MaterialCommunityIcons name={'plus'} />} color="white" size="sm" />}>
        Agregar invitado
       </Button>
      <FlatList data={invitados} renderItem={({
      item
    }) => <Box key={item._id} borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between" >
            <MaterialCommunityIcons name="account" size={48} color="#D7A86E" />
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.name+" "+item.last_name}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.dni}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                 (506) {item.phone}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.number_plate}
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.id} />


         

    </Box>
      

  );

  

 
}