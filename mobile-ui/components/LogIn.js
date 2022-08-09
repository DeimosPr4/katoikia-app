import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  FormControl,
  Input,
  Button,
  Image
} from "native-base";
import logo from "../assets/logo-katoikia.png";


export default function LogIn({navigation}) {
  return (
  
      
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Image source={
          logo
        } width={500} height={550}
    alt="Katoikia logo" size="xl" justifyContent="center" />

          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Bienvenido a Katoikia 
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
             Su app de comunidad de confianza
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label> Correo Electrónico</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label> Contraseña </FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => navigation.navigate('Password')}
              >
                  Recuperar contraseña
               
              </Link>
            </FormControl>
            <Button  mt="2" colorScheme="primary" onPress={() => navigation.navigate('Home')}
            >
              <Text>Continuar</Text>
            </Button>
           
          </VStack>
        </Box>
      </Center>
    
    
  );
}