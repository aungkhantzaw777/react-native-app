import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { login } from '@/api/login';
// import { } from 'react-native-dotenv'
// import { API_URL } from '@env';

// import { API_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';

export default function HomeScreen() {

  const { navigate } = useNavigation()

  const { control, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: any) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    console.log(apiUrl)

    await login({
      email: data.email,
      password: data.password
    }).then(r => {
      console.log(r.data)
      AsyncStorage.setItem('token', r.data.token)
      router.replace('/home')
    }).catch(e => {
      console.log(e)
    })

    console.log(data)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Back!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>

        <GestureHandlerRootView>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />


          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <View style={{
            marginTop: 16
          }}>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>Login</Button>
          </View>
          <View style={{
            marginTop: 16
          }}>
            <Button mode="outlined" onPress={() => router.replace('/signup')}>Sign up</Button>
          </View>
        </GestureHandlerRootView>

      </ThemedView>

    </ParallaxScrollView>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
