import { useAuthStore } from "@/store/useAuth"
import { router } from "expo-router"
import { ReactNode, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from "react-native"
// import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
    children: ReactNode
}
export default function AuthGuardProvider({
    children
}: Props) {
    const setToken = useAuthStore(state => state.setToken)

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                router.replace('/home')
                setToken(value)
            }
        } catch (error) {
            console.log('something wrong')
        }

    }
    useEffect(() => {
        getToken()
    }, [])

    return (
        <>
            {children}
        </>
    )
}