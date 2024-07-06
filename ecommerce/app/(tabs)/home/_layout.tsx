import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>

            <Appbar.Header>
                <Appbar.Content title="Ecommerce App" />
            </Appbar.Header>
            <Tabs

                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="Cart"
                    options={{
                        title: 'Cart',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Profile"
                    options={{
                        title: 'None',
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name={focused ? 'user' : 'user'} color={color} size={24} />
                        ),

                    }}
                />

                {/* <Tabs.Screen
                    name="item"

                    options={{
                        title: 'Profile',
                        href: null,
                        tabBarStyle: {
                            display: 'none'
                        }

                    }}
                /> */}
                <Tabs.Screen
                    name="[id]"
                    options={{

                        href: null,
                        tabBarStyle: {
                            display: 'none'
                        }

                    }}
                />


            </Tabs>
        </>

    );
}
