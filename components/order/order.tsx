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
import { SOCKET_SERVER_URL } from '../../services/socket/socket'
import { stripe_pk } from '../../services/paiements/paiements'
import { StoreStackParams, MainTabParams } from '../../navigation/tool/tool'
import Bills from './bills'

type NavProp = StackNavigationProp<MainTabParams, 'store'>
type RProp = RouteProp<StoreStackParams, 'order'>

export default () => {
    const [initialised, setInitialised] = useState(false)
    const { width, height } = useWindowDimensions()
    const { params } = useRoute<RProp>()
    const { id_order } = params
    const navigation = useNavigation<NavProp>()
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const fetchPaymentSheetParams = async () => {
        const body = {
            id_order,
            publish_key: stripe_pk,
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
            <Bills id_order={parseInt(`${id_order}`, 10)} />
            <View style={Style.footer}>
                <TouchableOpacity
                    onPress={onPayed}
                    style={{
                        ...Style.Hbuttons,
                        backgroundColor: '#1B2444',
                    }}
                >
                    <Text style={{ color: '#FFFFFF' }}>PASSER AU PAYEMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onGoStore} style={Style.Hbuttons}>
                    <Text style={{ color: '#1B2444' }}>RETOUR AU STORE</Text>
                </TouchableOpacity>
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
        minHeight: 100,
        maxHeight: 100,
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
})
