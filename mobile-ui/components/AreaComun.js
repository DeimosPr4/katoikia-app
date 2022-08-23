import React, {useContext, useEffect, useState} from "react";

import {
    Box, 
    Heading, 
    VStack, 
    FormControl, 
    Input, 
    Button,
    Center, 
    Select, CheckIcon
  } from "native-base";
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";

export default function AreaComun({navigation}){

  const { user } = useContext(UserContext)
  const [service, setService] = useState("");
  const [areas, setAreas] = useState([])
  const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {

      const onRequestReservasData = async () => {
        setIsRequesting(true);
  
        try {
          const jsonResponse = await fetch(`${API.BASE_URL}/commonArea/allCommonAreas`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const response = await jsonResponse.json();
          console.log(response.message);
  
          setAreas(response.message);
  

  
        } catch (error) {
            console.log("ERROR:" + error);
        }
  
        setIsRequesting(false)
      }
  
      onRequestReservasData()


    }, [user])
    

   

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
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <FormControl.Label>Área común</FormControl.Label>
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Elija su área común" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>

        {areas.map(item => (
          <Select.Item label={item.name} value={item.name} />
        ))}
          
        
          
        </Select>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Hora de inicio</FormControl.Label>
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Hora de inicio" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          
        </Select>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Hora de finalización</FormControl.Label>
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Hora de finalización" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          
        </Select>
          </FormControl>
         
        
          <Button mt="2" backgroundColor="tertiary.600">
            Reservar
          </Button>
          <Button mt="6" colorScheme="error" onPress={() => navigation.navigate('Comunicados')}>
            Cancelar
          </Button>
        </VStack>
      </Box>
        </Center>
       
    )
}