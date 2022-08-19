import React from "react";

import {
    Box, 
    Heading, 
    VStack, 
    FormControl, 
    Input, 
    Button,
    Center
  } from "native-base";

export default function AreaComun({navigation}){

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
          <FormControl>
            <FormControl.Label>Hora de inicio</FormControl.Label>
            <Input type="text"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Hora de finalización</FormControl.Label>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Lugar</FormControl.Label>
            <Input type="text" />
          </FormControl>
        
          <Button mt="2" backgroundColor="orange.300">
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