import { format } from "date-fns";
import {
    Badge,
    Box, HStack, Pressable,
    Spacer, Text
} from "native-base";
import PropTypes from 'prop-types';

import React from 'react';

export const CommentCard = ({ date, comment }) => {
    const dateFormated = format(new Date(date), "dd LL yyyy")
    return (
        <Pressable
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="coolGray.300"
            maxW="96"
            shadow="3"
            bg="coolGray.100"
            p="5"
            marginTop="4"
        >
            <Box>
                <HStack alignItems="center">
                    <Badge colorScheme="darkBlue" _text={{
                        color: "white"
                    }} variant="solid" rounded="4">
                        Comunicado
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="coolGray.800">
                        {dateFormated}
                    </Text>
                </HStack>
                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    Administrador de Comunidad
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                    {comment}
                </Text>
            </Box>
        </Pressable>
    )
}

CommentCard.propTypes = {
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
}
