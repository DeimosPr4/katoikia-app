import React from "react";
import {
    Text,
    HStack,
    IconButton,
    Box,
    StatusBar,
    Icon, 
    MaterialIcons,
    Center
  } from "native-base";

export default function Home(){

    return (
        <Center width={"100%"} marginTop={"auto"}>
             <StatusBar bg="#D7A86E" barStyle="light-content" />
      <Box safeAreaTop bg="#D7A86E" />
      <HStack bg="#D7A86E" px="2" py="4" justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
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