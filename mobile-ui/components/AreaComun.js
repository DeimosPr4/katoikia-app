import React, {useContext, useEffect, useState} from "react";
import {
    Box, 
    Heading, 
    VStack, 
    FormControl,
    Button,
    Center, 
    Select, CheckIcon, ScrollView
  } from "native-base";
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";
import {TimePicker} from 'react-native-simple-time-picker';
import { View, StyleSheet } from "react-native";
import { number } from "prop-types";
import DateTimePicker from '@react-native-community/datetimepicker';
export default function AreaComun({navigation}){

  const { user } = useContext(UserContext)
  const [service, setService] = useState("");
  const [areas, setAreas] = useState([])
  const [isRequesting, setIsRequesting] = useState(false);
  const [time, setTime] = useState(new Date())
  const idComunidad = user.community_id
  const date = new Date(); 
  const [mode, setMode] = useState('time');

  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState()

    useEffect(() => {

      const onRequestReservasData = async () => {
        setIsRequesting(true);

  
  
        try {
          const jsonResponse = await fetch(`${API.BASE_URL}/commonArea/findByCommunity/` + `${idComunidad}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const response = await jsonResponse.json();
          // console.log(response.message);
  
          setAreas(response.message);
  

  
        } catch (error) {
            console.log("ERROR:" + error);
        }
  
        setIsRequesting(false)
      }
  
      onRequestReservasData()


    }, [user])


    const postReserva = async() => {

      // console.log(startDate.split('"')[1]);
      // console.log(startTime.split('.')[0]);


      const data = {
        
        "time": startTime.split('.')[0],
        "date": startDate.split('"')[1],
        "user_id" : user._id, 
        "common_area_id": service._id,
        "common_area_name": service.name, 
        "community_id": service.community_id
      
      }

      console.log(data);
      try {

        const jsonDataResponse = await fetch(`${API.BASE_URL}/reservation/createReservation`, {
          cache: 'no-cache', 
          method: 'POST', 
          body: JSON.stringify(data), 
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await jsonDataResponse.json();
        console.log(response.message);
        
      } catch (error) {
        console.log("ERROR:" + error);
      }
    }
    

    const onChangeStart = (event, selectedDate) => {

      // console.log(selectedDate);

      const dateString = JSON.stringify(selectedDate).toString().split("T") 

      setStartDate(dateString[0])
      setStartTime(dateString[1])

      console.log(dateString);
     
      // console.log(Date.toString(selectedDate));
      const currentDate = selectedDate || time;
     
      setTime(currentDate);
    };

    return (
        <Center>
             <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Katoikia
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
         Reserve su área común 
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}> 
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <FormControl.Label>Área común</FormControl.Label>
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Elija su área común" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>

        {areas.map(item => (
          <Select.Item key={item._id} label={item.name} value={item} />
        ))}
          
        </Select>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Hora de inicio</FormControl.Label>
            <View  >
            <DateTimePicker  minimumDate={date} mode="datetime" is24Hour={true} value={time} onChange={onChangeStart}/>
            </View>
          </FormControl>
         
        
          <Button mt="10" backgroundColor="tertiary.600" onPress={()=> postReserva()}>
            Reservar
          </Button>
          <Button mt="3" colorScheme="error" onPress={() => navigation.navigate('Mis Reservas')}>
            Cancelar
          </Button>
        </VStack>

        </ScrollView>
      </Box>
        </Center>
       
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  }
});