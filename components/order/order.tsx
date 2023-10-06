import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StoreStackParams, MainTabParams } from '../../navigation/tool/tool'
import Bills from './bills'

type NavProp = StackNavigationProp<MainTabParams, 'store'>
type RProp = RouteProp<StoreStackParams, 'order'>

export default () => {
    const { width, height } = useWindowDimensions()
    const { params } = useRoute<RProp>()
    const { id_order } = params
    const navigation = useNavigation<NavProp>()

    const onGoHome = () => {
        navigation.navigate('main', { screen: 'root' })
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
                    onPress={onGoHome}
                    style={{
                        ...Style.Hbuttons,
                        backgroundColor: '#1B2444',
                    }}
                >
                    <Text style={{ color: '#FFFFFF' }}>ACCUEIL</Text>
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
