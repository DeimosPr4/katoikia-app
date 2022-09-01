import { format } from "date-fns";
import {
    Box,
    ScrollView,
    Text, 
    Stack, 
    Heading,
    Badge
} from "native-base";
import PropTypes from 'prop-types';

import React from 'react';

export const ReservasCard = ({ date, startTime, endTime, status, name}) => {
    const dateFormated = format(new Date(date), "dd LL yyyy")
  

    try {
        
    } catch (error) {
        
    }

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

        
            <Heading size="lg" ml="-1">
             {name}
            </Heading>
            <Text fontSize="md" _light={{
            color: "success.600"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
             {dateFormated}
            </Text>
          </Stack>
          <Text fontSize="md" fontWeight="400">
            Hora de inicio: {startTime}
          </Text>
      
        
        </Stack>


      </Box>
    </Box>
        </ScrollView>
    )

}
ReservasCard.propTypes = {
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}