import React, {useContext, useEffect, useState} from "react";
import {
  Box,
  ScrollView,
  Fab,
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
 

  useEffect(() => {

    const onRequestReservasData = async () => {
      setIsRequesting(true);

      try {
        const jsonResponse = await fetch(`${API.BASE_URL}/reservation/allReservations`, {
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


  return (

    <Box>
       <Heading fontSize="xl" p="4" pb="3">
    Lista de reservas
  </Heading>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Button width='200' mb="4"  mt="4" ml='85' backgroundColor='tertiary.600' onPress={() => navigation.navigate('area')}  icon={<Icon mb="0.5" as={<MaterialCommunityIcons name={'plus'} />} color="white" size="sm" />}>
        Reservar
       </Button>
          
          {
          reservas.map(item => (
            <ReservasCard
              key={item._id}
              date={item.date_entry}
              startTime={item.start_time}
              endTime={item.finish_time}
              status={item.status}
            />
          ))
        }

    </ScrollView>
    </Box>
   
  ); 
}