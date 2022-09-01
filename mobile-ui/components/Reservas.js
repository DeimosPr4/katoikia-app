import React, {useContext, useEffect, useState} from "react";
import {
  Box,
  ScrollView,
  Text,
  Icon, 
  Button, 
  Heading
} from "native-base";
import { API } from "../environment/api";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { UserContext } from "../context/UserContext";
import { ReservasCard } from "./ReservasCard";

export default function Reservas({navigation}) {

  const { user } = useContext(UserContext)
  const [isRequesting, setIsRequesting] = useState(false);
  const [reservas, setReservas] = useState([]);
  const id = user._id;
  // const id = "6301df20dac7dcf76dcecade";

  console.log(user);
 

  useEffect(() => {

    const onRequestReservasData = async () => {
      setIsRequesting(true);

      console.log(user);
      try {
        const jsonResponse = await fetch(`${API.BASE_URL}/reservation/findReservationUser/`+`${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await jsonResponse.json();
        console.log(response);

        setReservas(response.message);


      } catch (error) {
          console.log("ERROR:" + error);
      }

      setIsRequesting(false)
    }

    onRequestReservasData()

  }, [user])

  console.log(reservas);


  return (

    <Box>
       <Heading fontSize="xl" p="4" pb="3">
    Lista de reservas
  </Heading>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Button width='200' mb="4"  mt="4" ml='85' backgroundColor='tertiary.600' onPress={() => navigation.navigate('Reservar')}  icon={<Icon mb="0.5" as={<MaterialCommunityIcons name={'plus'} />} color="white" size="sm" />}>
        Reservar
       </Button>
          
          { reservas == [] ? <Text mt="9" ml='10'> No hay reservas relacionados a su usuario</Text> :
          
          reservas.map(item => (
            <ReservasCard
              key={item._id}
              date={item.date}
              startTime={item.time}
              status={item.status}
              name={item.common_area_name}
              id={item._id}
            />
          ))
        }

    </ScrollView>
    </Box>
   
  ); 
}