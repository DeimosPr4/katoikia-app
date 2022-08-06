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
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";
import logo from "./assets/logo-katoikia.png"

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config,
colors: {
  brown: "#D7A86E"
} });

// const logo = require('./assets/logo-katoikia.png')


export default function App() {
  return (
    <NativeBaseProvider>
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
              >
                  Recuperar contraseña
               
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="primary"
            >
              <Text>Continuar</Text>
            </Button>
           
          </VStack>
        </Box>
      </Center>
      
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
