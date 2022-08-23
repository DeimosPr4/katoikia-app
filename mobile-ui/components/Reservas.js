import React from "react";
import {
  Text,
  HStack,
  AntDesign,
  Heading,
  Stack,
  Box,
  ScrollView,
  Fab,
  Icon
} from "native-base";
import logo from "../assets/logo-katoikia.png";
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginTop: 50, 
    marginBottom: 10
  }, 

  iconStyle: {
    padding: 10, 
  }, 

  viewSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  container: {

  }
})

export default function Reservas({navigation}) {
  return (
  
    <ScrollView showsVerticalScrollIndicator={false}>
          
       
      
    <Box mt="5" alignItems="center">
      <Box width="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Reserva #1
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              horario de Reserva
            </Text>
          </Stack>
          <Text fontWeight="400">
            Descripcion
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>


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