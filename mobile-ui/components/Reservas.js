import React, {useContext, useEffect, useState} from "react";
import {
  Box,
  ScrollView,
  Fab,
  Icon
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

    console.log("im in");

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

        try {

         
        } catch (error) {
          console.log("ERROR:" + error);
        }

      } catch (error) {
          console.log("ERROR:" + error);
      }

      setIsRequesting(false)
    }

    onRequestReservasData()

  }, [user])


  return (
  
    <ScrollView showsVerticalScrollIndicator={false}>
          
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


    <Box height="200" w="300" shadow="2" rounded="lg" m='5' ml='9' _dark={{
      bg: "coolGray.200:alpha.20"
    }} _light={{
      bg: "coolGray.200:alpha.20"
    }}>
        <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon mb="0.5" as={<MaterialCommunityIcons name={'plus'} />} color="white" size="sm" />} onPress={() => navigation.navigate('area')}/>
      </Box>
    </ScrollView>
  );


 
}