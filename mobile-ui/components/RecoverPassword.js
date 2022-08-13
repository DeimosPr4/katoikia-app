import React from "react";
import {
    Text,
    Link,
    Center,
    Heading,
    VStack,
    Box,
    FormControl,
    Input,
    Button
  } from "native-base";
export default function RecoverPassword () {

return (
    <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Recupere su contraseña
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Se le enviaran las instrucciones al correo electrónico
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label> Correo Electrónico</FormControl.Label>
          <Input />
        </FormControl>
       
        <Button  mt="2" colorScheme="primary" onPress={() => navigation.navigate('Home')}
        >
          <Text>Recuperar contraseña</Text>
        </Button>
       
      </VStack>
    </Box>
  </Center>

)
}