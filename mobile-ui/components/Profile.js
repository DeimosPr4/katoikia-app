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

export default function Profile({navigation}){

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
          Modifique sus datos
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input type="text"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Correo Electrónico</FormControl.Label>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Teléfono</FormControl.Label>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña actual</FormControl.Label>
            <Input type="password" />
          </FormControl>
          
          <Button mt="2" backgroundColor="orange.300">
            Actualizar
          </Button>
          <Button mt="6" colorScheme="error" onPress={() => navigation.navigate('Inicio')}>
            Cerrar sesión
          </Button>
        </VStack>
      </Box>
        </Center>
       
    )
}