import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useStripe } from '@stripe/stripe-react-native'
import axios from 'axios'
import socket, { SOCKET_SERVER_URL } from '../../services/socket/socket'
import { useAppSelector } from '../../store/hooks/hooks'
import { stripe_pk } from '../../services/paiements/paiements'
import { StoreStackParams, MainTabParams } from '../../navigation/tool/tool'
import Bills from './bills'

type NavProp = StackNavigationProp<MainTabParams, 'store'>
type RProp = RouteProp<StoreStackParams, 'order'>

export default () => {
    const [initialised, setInitialised] = useState(false)
    const [status, setStatus] = useState('processing')
    const { width, height } = useWindowDimensions()
    const user = useAppSelector((state) => state.user)
    const { params } = useRoute<RProp>()
    const { id_order } = params
    const navigation = useNavigation<NavProp>()
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const fetchPaymentSheetParams = async () => {
        const body = {
            id_order,
            publish_key: stripe_pk,
            user_id: user.id,
        }
        console.log('lancement de la requete')

        const response = (
            await axios.post(`${SOCKET_SERVER_URL}/api/paiement/sheet`, body)
        ).data

        console.log(response, 'paiement-sheet')

        const { paymentIntent, ephemeralKey, customer } = response

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        }
    }

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } =
            await fetchPaymentSheetParams()

        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Sport-360',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            returnURL: 'pichichiz://stripe-redirect',
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            // methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Test',
            },
        })
        if (error) {
            console.log(error)
        } else setInitialised(true)
    }

    useEffect(() => {
        socket.on('order_done', (data) => {
            if (
                parseInt(`${data.user_id}`, 10) === parseInt(`${user.id}`, 10)
            ) {
                console.log(data)
                setStatus('done')
            }
        })

        socket.on('order_processing', (data) => {
            if (
                parseInt(`${data.user_id}`, 10) === parseInt(`${user.id}`, 10)
            ) {
                console.log(data)
                setStatus('processing')
            }
        })

        socket.on('order_cancel', (data) => {
            if (
                parseInt(`${data.user_id}`, 10) === parseInt(`${user.id}`, 10)
            ) {
                console.log(data)
                setStatus('cancel')
            }
        })

        return () => {
            socket.off('order_done')
            socket.off('order_processing')
            socket.off('order_cancel')
        }
    }, [])

    useEffect(() => {
        initializePaymentSheet()
    }, [])

    const onPayed = async () => {
        if (!initialised) {
            console.log('not initialised')
            return
        }
        // navigation.navigate('main', { screen: 'root' })
        const { error } = await presentPaymentSheet()

        if (error) {
            console.log(`Error code: ${error.code}`, error.message)
        } else {
            console.log('Success', 'Your order is confirmed!')
        }
    }

    const onGoStore = () => {
        navigation.navigate('store', { screen: 'storemain' })
    }

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                maxWidth: width,
                maxHeight: height - 200,
                minHeight: height - 200,
            }}
        >
            <View style={Style.header}>
                <Text style={Style.title}>Merci pour ta commande !</Text>
                <Text style={Style.text}>
                    Voici le récapitulatif de ta commande, tu vas également le
                    recevoir par mail. Les bonus achetés sont directement
                    utilisables.
                </Text>
            </View>
            <Bills
                id_order={parseInt(`${id_order}`, 10)}
                setStatus={setStatus}
            />
            <View style={Style.footer}>
                <TouchableOpacity
                    disabled={
                        status === 'processing' ||
                        status === 'done' ||
                        !initialised
                    }
                    onPress={onPayed}
                    style={{
                        ...Style.Hbuttons,
                        backgroundColor: '#1B2444',
                        opacity:
                            status === 'processing' ||
                            status === 'done' ||
                            !initialised
                                ? 0.5
                                : 1,
                    }}
                >
                    <Text style={{ color: '#FFFFFF' }}>PASSER AU PAYEMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onGoStore} style={Style.Hbuttons}>
                    <Text style={{ color: '#1B2444' }}>RETOUR AU STORE</Text>
                </TouchableOpacity>
                {status === 'processing' && (
                    <View style={Style.messageBox}>
                        <Text
                            style={{ ...Style.messageText, color: '#85E9E1' }}
                        >
                            Paiement en cours de traitement.
                        </Text>
                    </View>
                )}
                {status === 'cancel' && (
                    <View style={Style.messageBox}>
                        <Text
                            style={{ ...Style.messageText, color: '#CC317C' }}
                        >
                            Paiement annulé.
                        </Text>
                    </View>
                )}
                {status === 'done' && (
                    <View style={Style.messageBox}>
                        <Text
                            style={{ ...Style.messageText, color: '#31CCC0' }}
                        >
                            Paiement effectué avec succès.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    header: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minWidth: 348,
        maxWidth: 348,
        minHeight: 75,
        maxHeight: 75,
    },
    title: {
        fontWeight: 'bold',
        color: '#1B2444',
    },
    text: {
        color: '#1B2444',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 150,
        maxHeight: 150,
    },
    Hbuttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: 7,
    },
    messageBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 350,
        maxWidth: 350,
        marginVertical: 10,
    },
    messageText: {
        fontSize: 11,
    },
})
