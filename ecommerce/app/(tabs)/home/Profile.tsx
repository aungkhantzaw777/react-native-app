import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";


export default function Profile() {

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        router.replace('/')
    }
    return (
        <View>
            <Text>Hello</Text>
            {/* <Button onPress={() => { }}>logout</Button> */}
            <Button mode="contained" buttonColor={'red'} onPress={logout} >logout</Button>
        </View>
    )
}