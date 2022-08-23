import { format } from "date-fns";
import {
    Box, HStack,
    ScrollView,
    Text, 
    Stack, 
    Heading,
    Badge
} from "native-base";
import PropTypes from 'prop-types';

import React from 'react';

export const ReservasCard = ({ date, startTime, endTime, status}) => {
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

          <Badge backgroundColor={status === 1 ? 'tertiary.500' : 'danger.600'} _text={{
                        color: "white"
                    }} variant="solid" rounded="4">
                        <Text bold={true} color='danger.50'> {status === 1 ? 'LIBRE' : 'RESERVADO'}</Text>
                    </Badge>
            <Heading size="md" ml="-1">
              Reserva #1
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
             {dateFormated}
            </Text>
          </Stack>
          <Text fontWeight="400">
            Hora de inicio: {startTime}
          </Text>
          <Text fontWeight="400">
            Hora de finalización: {endTime}
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
    endTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}