import apiService from "@/api/service";
import { useOrderMutation } from "@/feature/order/useMutation";
import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/useAuth";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button, Modal, Portal, Snackbar } from "react-native-paper";

export default function ItemDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const token = useAuthStore(state => state.token)

    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);


    const { data, isError, error, refetch, isFetching } = useApi(['detail'], (ctx, token) => {
        return apiService(token).get<SingleProduct>(`/api/product/${id}`)
    })

    const { mutateAsync, isPending, } = useOrderMutation(token)

    const onOrder = async () => {
        await mutateAsync(id || '')
        // router.replace('/home')
        setVisible(true)
    }

    return (
        <View>
            {/* <Text style={{ color: 'white' }}>{id}</Text> */}
            {/* <Image src="" /> */}

            <Image
                style={{
                    width: 'auto',
                    height: 240,
                }}
                source={{
                    uri: data?.data.product.imageUrl || ''
                }} />
            <View style={{
                marginBottom: 24
            }}>
                <Text style={{ color: 'white' }}>{data?.data.product.name}</Text>
                <Text style={{ color: 'white' }}>{data?.data.product.name}</Text>
                <Text style={{ color: 'white' }}>{data?.data.product.price}</Text>
                <Text style={{ color: 'white' }}>{data?.data.product.detail}</Text>
            </View>



            <Button mode={'contained'} loading={isPending} onPress={onOrder}>Place my order</Button>

            <Portal>
                <Modal visible={visible}  >
                    <Text>your order is successfully place</Text>
                    <Button onPress={() => {
                        setVisible(false)
                        router.replace('/home')
                    }}>Ok</Button>
                </Modal>
            </Portal>

        </View>
    )
}