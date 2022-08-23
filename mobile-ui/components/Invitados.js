import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";
import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack,FlatList, HStack,Avatar,Spacer,Text
} from "native-base";

export default function Invitados({navigation}) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [invitados, setInvitados] = useState([]);
  const id = "62ff074949eb1e993a9d0fda";


  useEffect(() => {

    const onRequestCommentsData = async () => {
      setIsRequesting(true);

      try {
        const jsonResponse = await fetch(`${API.BASE_URL}/guest/findGuestUser/`+`${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await jsonResponse.json();
        console.log(response);
        setInvitados(response.message);

      } catch (error) {

      }

      setIsRequesting(false)
    }

    onRequestCommentsData()

  })




  const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!"
    }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!"
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today."
    }];
  return (
  
       <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Lista de invitados
      </Heading>
      <FlatList data={invitados} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
            <MaterialCommunityIcons name="account" size={48} color="green" />
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
                  {item.phone}
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