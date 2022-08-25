import React, { useContext, useState } from "react";
import { API } from "../environment/api";
import {
  Box, Button,
  Center, FormControl, Heading, ScrollView, VStack
} from "native-base";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import { UserContext } from "../context/UserContext";
import {SceneMap, TabView} from 'react-native-pager-view';

export default function Profile({ navigation }) {

  const baseURL = `${API.BASE_URL}/user/updateUser/`
  const [name, setName] = useState(); 
  const [apellido, setApellido] =useState(); 
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState();
  const [index, setIndex] = useState(0); 

  const [routes] = useState([{
    key: "first", 
    title: 'Información'
  }, {
  key: "second", 
  title: 'Contraseña'}])

  const userData = useContext(UserContext)
  const id = userData.user._id;

  console.log(userData.user);

  const ProfileView = () => {

    <ScrollView width='100%' h='550' ml='36' _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
             <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Bienvenido {userData.user.name}
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Modifique sus datos
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>DNI</FormControl.Label>
            <TextInput type="text" defaultValue={userData.user.dni} editable={false} />
          </FormControl>
          {/* <FormControl>
            <FormControl.Label>Teléfono</FormControl.Label>
            <TextInput type="text" defaultValue={userData.user.phone} editable={false} />
          </FormControl> */}
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <TextInput style={styles.input} type="text" defaultValue={userData.user.name} onChangeText={(value) => setName(value) }/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <TextInput style={styles.input} type="text"defaultValue={userData.user.last_name} onChangeText={(value) => setApellido(value) } />
          </FormControl>
          <FormControl>
            <FormControl.Label>Correo electrónico</FormControl.Label>
            <TextInput style={styles.input} type="text" defaultValue={userData.user.email} onChangeText={(value) => setEmail(value) }/>
          </FormControl>
          <Button mt="2" backgroundColor="orange.300" onPress={() => updateInfo()}>
            Actualizar
          </Button>
          <Button mt="6" colorScheme="error" onPress={() => navigation.navigate('Inicio')}>
            Cerrar sesión
          </Button>
        </VStack>
      </Box>

      </ScrollView>

  }

  const PasswordView = () => {

    <ScrollView width='100%' h='550' ml='36' _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}> 

    <Box safeArea p="2" w="90%" maxW="290" py="8"> 
    <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Bienvenido {userData.user.name}
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Modifique sus contraseña
        </Heading>

        <VStack space={3} mt="5"> 
        <FormControl>
            <FormControl.Label>Contraseña actual</FormControl.Label>
            <TextInput style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) }/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Nueva Contraseña</FormControl.Label>
            <TextInput style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) }/>
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirmar nueva contraseña</FormControl.Label>
            <TextInput style={styles.input} type="password" defaultValue="" onChangeText={(value) => setPassword(value) }/>
          </FormControl>

          <Button mt="2" backgroundColor="orange.300" onPress={() => updateInfo()}>
            Actualizar contraseña
          </Button>
          
        </VStack>
    </Box>


    </ScrollView>
    
  }

  const initialLayout = {
    width: Dimensions.get('window').width
  }

  const renderScene = SceneMap({
    first: ProfileView, 
    second: PasswordView
  })


  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable onPress={() => {
            console.log(i);
            setIndex(i);
          }}>
                <Animated.Text style={{
              color
            }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>;
      })}
      </Box>;
  };

  
  const updateInfo = async() => {

    const data = {
      "_id": "6301df20dac7dcf76dcecade",
      "dni": "1234567890",
      "name": name,
      "last_name": apellido,
      "email": email,
      "phone": 12121212,
      "password": "827ccb0eea8a706c4c34a16891f84e7b",
      "user_type": "3",
      "status": "1",
      "date_entry": "2022-08-21T07:30:09.929Z",
      "community_id": null,
    }

    try {

      await fetch(baseURL+`${id}`, {

        cache: 'no-cache', 
        method: 'PUT', 
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {

        console.log(baseURL+`${id}`);
        if (response.status != 201){
          console.log('ocurrio un error ');
        }else{
          return response.json(); 
        }
      })
      
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }



    return (
        <Center>
        <TabView navigationState={{
              index,
              routes
            }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
              marginTop: StatusBar.currentHeight
            }} />;
    </Center>

  )


}

const styles = StyleSheet.create({
  input: {
    height: 10,
    margin: 3,
    borderWidth: 0.5,
    padding: 5,
    flex: 1,
    paddingTop: 9,
    paddingRight: 19,
    paddingBottom: 20,
    paddingLeft: 0,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 4
  }
})

