import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import moment from 'moment'
import OAuth from './services/store/OAuth'
import { Init } from './services/factory/User'
import Stack from './navigation/stack/Stack'
import Store from './store/configureStore'

export default () => {
    // concentrer les opération socket-io ici notamment les events reçu
    /** socket.emit('friend_request', {
            auth: {
                token: `${token}`,
            },
            data: {
                user_id: parseInt(`${User.id}`, 10),
                friend_id: data.user_id,
            },
        }) */

    // initialise notification

    // initialisation from classic API server
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
                console.log(`token from socket API Server: ${response}`)
            } catch (error) {
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
        </SafeAreaProvider>
    )
}
