import React from "react";
import {
    Text,
    HStack,
    Badge,
    Box,
Pressable,
    Spacer, 
    Flex,
    Center
  } from "native-base";
  import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export default function Home(){

  const [selected, setSelected] = React.useState(0);
    return (

      <Box alignItems="center">
      <Pressable onPress={() => console.log("I'm Pressed")} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" marginTop="4">
        <Box>
          <HStack alignItems="center">
            <Badge colorScheme="darkBlue" _text={{
            color: "white"
          }} variant="solid" rounded="4">
              Comunicado
            </Badge>
            <Spacer />
            <Text fontSize={10} color="coolGray.800">
              1 month ago
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Administrador de Comunidad
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            Notificacion sobre la aplicacion
          </Text>
         
        </Box>
      </Pressable>
      <Pressable onPress={() => console.log("I'm Pressed")} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" marginTop="4">
        <Box>
          <HStack alignItems="center">
            <Badge colorScheme="darkBlue" _text={{
            color: "white"
          }} variant="solid" rounded="4">
              Comunicado
            </Badge>
            <Spacer />
            <Text fontSize={10} color="coolGray.800">
              1 month ago
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Administrador General
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            Notificacion sobre la aplicacion
          </Text>
         
        </Box>
      </Pressable>
    </Box>
      //   <Center width={"100%"} marginTop={"auto"}>
           
      // <Box safeAreaTop bg="#D7A86E" flex={1} />
      // <HStack bg="#D7A86E" px="2" py="4" justifyContent="space-between" alignItems="center" w="100%" maxW="100%">

      //   <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0) && navigation.navigate('Home')}>
      //       <Center>
      //         <Icon mb="2" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="md" />
      //         <Text color="white" fontSize="15">
      //           Inicio
      //         </Text>
      //       </Center>
      //     </Pressable>
      
        
      //   <Pressable opacity={selected === 1 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(1) && ( () => navigation.navigate('Reservas'))}>
      //       <Center>
      //         <Icon mb="2" as={<MaterialCommunityIcons name={selected === 1 ? 'tree' : 'tree-outline'} />} color="white" size="md" />
      //         <Text color="white" fontSize="15">
      //           Reservas
      //         </Text>
      //       </Center>
      //     </Pressable>
      
       
      //   <Pressable opacity={selected === 2 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(2)}>
      //       <Center>
      //         <Icon mb="2" as={<MaterialCommunityIcons name={selected === 2 ? 'account' : 'account-outline'} />} color="white" size="md" />
      //         <Text color="white" fontSize="15">
      //           Perfil
      //         </Text>
      //       </Center>
      //     </Pressable>
     
        
      // </HStack>
      // </Center>
       
    )
}