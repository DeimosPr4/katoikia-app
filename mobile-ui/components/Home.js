import React from "react";
import {
    Text,
    HStack,
    NativeBaseProvider,
    IconButton,
    Box,
    StatusBar,
    Icon, 
    MaterialIcons,
    Center
  } from "native-base";

export default function Home(){

    return (
        <Center w="100%">
             <StatusBar bg="#D7A86E" barStyle="light-content" />
      <Box safeAreaTop bg="#D7A86E" />
      <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
      </Center>
       
    )
}