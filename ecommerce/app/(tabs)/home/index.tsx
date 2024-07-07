
import { getProduct } from '@/api/product';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View, StyleSheet, useColorScheme, FlatList, ScrollView } from 'react-native';
import { Appbar, Button, Card, Text, Avatar } from 'react-native-paper';

import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

// import { Avatar, Button, Card, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />



const RenderItem = (props: { item: Product }) => (
  <Card style={styles.singleCard}>
    <Card.Title title={props.item.name} subtitle="Abvaliable on our shop" />
    <Card.Content>
      <Text variant="titleLarge">{props.item.name}</Text>
      {/* <Text variant="bodyMedium">Card content</Text> */}
    </Card.Content>
    <Card.Cover source={{ uri: props.item.imageUrl }} />
    <Card.Actions>
      {/* <Button>Cancel</Button> */}
      <Button onPress={() => router.replace(`/home/${props.item._id}`)} mode='contained'>View</Button>
    </Card.Actions>
  </Card>
);


export default function Home() {

  const colorScheme = useColorScheme();
  const flatListRef = useRef();

  const { data, isError, error, refetch, isFetching, isLoading } = useApi(['myorder'], (ctx, token) => {
    console.log('token is', token)
    return getProduct(token)
  })

  function handleRefresh() {
    refetch()
  }


  return (

    <View>
      {/* <View>
        <Text style={{ color: 'white', fontSize: 64, textAlign: 'center' }}>Shop list</Text>

      </View> */}

      {/* <GestureHandlerRootView> */}
      {
        isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />

        ) : (
          <FlatList
            data={data?.data.products || []}
            renderItem={props => <RenderItem item={props.item} />}
            keyExtractor={item => {
              return item._id
            }}
            refreshing={isFetching}
            onRefresh={handleRefresh}


          />
        )
      }

      {/* </GestureHandlerRootView> */}



    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'

  },
  singleCard: {
    marginBottom: 14,
    paddingHorizontal: 16,
    marginHorizontal: 24

  }

});
