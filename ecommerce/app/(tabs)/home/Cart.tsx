import { getOrder } from "@/api/order";
import { useApi } from "@/hooks/useApi";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, } from "react-native-paper";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const RenderItem = (prop: {
    item: MyOrder
}) => {
    console.log('current item ', prop.item)
    return (
        <View>
            <Text style={{
                color: 'white'
            }}>hello world</Text>
            {/* <View>
                <Image
                    style={{
                        width: 'auto',
                        height: 240,
                    }}
                    source={{
                        uri: prop.item.imageUrl
                    }}
                />
            </View>
            <View>
                <Text style={{
                    color: 'white'
                }}>{prop.item.name}</Text>
            </View> */}

        </View>
    )
}

export default function Cart() {

    const { data, isError, error, refetch, isFetching, isLoading } = useApi(['shopping'], (ctx, token) => {
        console.log('token is', token)
        return getOrder({
            token: token || '',

        })
    })

    function handleRefresh() {
        refetch()
    }
    return (
        <View>
            {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
            {/* <GestureHandlerRootView>
                <FlatList

                    data={data?.data.myOrder || []}
                    renderItem={props => <RenderItem item={props.item} />}
                    keyExtractor={(item, i) => {
                        return i.toString()
                    }}
                    refreshing={isFetching}
                    onRefresh={handleRefresh}
                />
            </GestureHandlerRootView> */}
            {/* {
                data?.data.myOrder?.map((orders, i) => (
                    <View key={i}>
                        <Text style={{
                            color: 'white'
                        }}>{orders.name}</Text>
                    </View>
                ))
            } */}

            {/* {
                isLoading ? (
                    <ActivityIndicator animating={true} color={MD2Colors.red800} />
                ) : (
                    <GestureHandlerRootView>

                        <FlatList

                            data={data?.data.myOrder || []}
                            renderItem={props => <RenderItem item={props.item} />}
                            keyExtractor={(item, i) => {
                                return i.toString()
                            }}
                            refreshing={isFetching}
                            onRefresh={handleRefresh}
                        />
                    </GestureHandlerRootView>
                )
            } */}



            {/* </GestureHandlerRootView> */}



        </View>
    )
}