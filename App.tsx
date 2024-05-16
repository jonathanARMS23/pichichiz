import React, { useEffect, useCallback } from 'react'
import { StatusBar, Linking } from 'react-native'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RNAatkit } from '@addapptr/react-native-aatkit'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import moment from 'moment'
import OAuth from './services/store/OAuth'
import { Init } from './services/factory/User'
import Stack from './navigation/stack/Stack'
import Store from './store/configureStore'
import { stripe_pk } from './services/paiements/paiements'
import { PLACEMENT } from './pubs'

export default () => {
    const { handleURLCallback } = useStripe()

    const handleDeepLink = useCallback(
        async (url: string | null) => {
            if (url) {
                const stripeHandled = await handleURLCallback(url)
                if (stripeHandled) {
                    // This was a Stripe URL - you can return or add extra handling here as you see fit
                    console.log(stripeHandled)
                } else {
                    // This was NOT a Stripe URL – handle as you normally would
                    console.log('this was not a stripe URL')
                }
            }
        },
        [handleURLCallback]
    )

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL()
            handleDeepLink(initialUrl)
        }

        getUrlAsync()

        const deepLinkListener = Linking.addEventListener(
            'url',
            (event: { url: string }) => {
                handleDeepLink(event.url)
            }
        )

        return () => deepLinkListener.remove()
    }, [handleDeepLink])

    useEffect(() => {
        RNAatkit.initWithConfigurationAndCallback(
            {
                // testModeAccountID: 136,
                consent: {
                    type: RNAatkit.ConsentType_ManagedCMPGoogle,
                    yourAccountID: 22679766841,
                    showIfNeededSetting: RNAatkit.ShowIfNeededSetting_Always,
                },
                consentRequired: true,
            },
            (initialized) => {
                console.log('AATKIT INIT', initialized)
                RNAatkit.setDebugEnabled(true)
                if (initialized) {
                    RNAatkit.reloadConsent()
                    RNAatkit.createPlacement(
                        PLACEMENT,
                        RNAatkit.PlacementSize_Fullscreen
                    )
                    // reload placement
                    // RNAatkit.startPlacementAutoReload(PLACEMENT)
                }
            }
        )
    }, [])

    useEffect(() => {
        const API = new OAuth()
        ;(async () => {
            try {
                const response = await API.InitKey()
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        })()

        return () => {
            API.Cancel()
        }
    }, [])

    // initialisation from sockset API server
    useEffect(() => {
        const API = new OAuth()
        ;(async () => {
            try {
                const response = await API.InitKeyFromSocketServer()
                console.log(response)
                console.log(`token from socket API Server: ${response}`)
            } catch (error) {
                console.log('error on load token from socket server')
                console.log(error)
            }
        })()

        return () => {
            API.Cancel()
        }
    }, [])

    useEffect(() => {
        moment.locale('fr')
        ;(async () => {
            await Init()
        })()
    }, [])

    return (
        <SafeAreaProvider>
            <StripeProvider
                publishableKey={stripe_pk}
                urlScheme="pichichiz" // required for 3D Secure and bank redirects
                merchantIdentifier="merchant.com.pichichiz" // required for Apple Pay
            >
                <Provider store={Store}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#000000"
                        barStyle="default"
                        showHideTransition="fade"
                        hidden={false}
                    />
                    <Stack />
                </Provider>
            </StripeProvider>
        </SafeAreaProvider>
    )
}
