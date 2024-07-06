import { useSignup } from "@/feature/signup/useMutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Appbar, Button, TextInput } from 'react-native-paper';


export default function signup() {
    const { control, handleSubmit } = useForm<User>({
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    })
    const { error, mutateAsync, isPending } = useSignup()

    const onSubmit = async (params: User) => {
        await mutateAsync(params).then((response) => {
            AsyncStorage.setItem('token', response.data.token)
            router.replace('/home')
        })
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title="Sign Up form" />

            </Appbar.Header>
            <View style={{
                paddingHorizontal: 16
            }}>

                <View>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                    />

                </View>
                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Username"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name"
                    />
                </View>
                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                secureTextEntry
                                placeholder="Username"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="password"
                    />
                </View>
                <View style={{
                    marginTop: 14
                }}>
                    <Button loading={isPending} onPress={handleSubmit(onSubmit)} mode="contained-tonal">Sign up</Button>
                </View>

            </View>
        </View>
    )
}

