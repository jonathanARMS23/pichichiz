import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

type LigueNavProp = StackNavigationProp<RootStackParams, 'confirmRejoindre'>
type confirmRejoindreProp = RouteProp<RootStackParams, 'confirmRejoindre'>
export default () => {
    const [loading, setLoading] = useState(true)
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation<LigueNavProp>()
    const routeProp = useRoute<confirmRejoindreProp>()
    const { code, data } = routeProp.params

    useEffect(() => {
        if (data) {
            console.log('ligue à rejoindre: ', data)
        }
        if (code) {
            console.log('code du ligue à rejoindre: ', code)
        }
        const myTimeout = setTimeout(() => setLoading(false), 2000)

        return () => {
            clearTimeout(myTimeout)
        }
    }, [])

    const goback = () => {
        navigation.navigate('ligue')
    }

    return (
        <View
            style={{
                ...Style.container,
                marginVertical: Platform.OS === 'ios' ? 20 : 0,
            }}
        >
            <View
                style={{
                    ...Style.top,
                    width: width,
                    maxHeight: (height * 2) / 3,
                }}
            >
                <Image
                    source={require('../../assets/images/ligue.png')}
                    style={Style.banner}
                />
                <View style={Style.ligueInfo}>
                    {loading ? null : (
                        <Icon
                            name="checkmark-circle-2"
                            height={70}
                            width={70}
                            fill="#31CCC0"
                        />
                    )}

                    <Text
                        style={{
                            color: COLORS.light_primary,
                            paddingVertical: 5,
                            marginTop: 5,
                            fontSize: 15,
                        }}
                    >
                        REJOINDRE LA LIGUE
                    </Text>
                    <Text style={Style.ligueName}>FBDB</Text>
                </View>
                <View style={Style.infoLoading}>
                    {loading ? (
                        <View style={Style.loading}>
                            <ActivityIndicator
                                size="large"
                                color={COLORS.light_primary}
                            />
                            <Text style={Style.loadingText}>CHARGEMENT</Text>
                        </View>
                    ) : (
                        <Text style={Style.textInfoLoading}>
                            Tu pourras accéder à la ligue et commencer les duels
                            une fois que tout le monde aura rejoint la lique et
                            que le créateur aura lancé la partie.
                        </Text>
                    )}
                </View>
            </View>
            <View style={Style.bottom}>
                <Text style={Style.exitText}>QUITTER</Text>
                <TouchableOpacity style={Style.exitButton} onPress={goback}>
                    <Icon name="close-outline" height={20} width={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    top: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light_primary,
    },
    banner: {
        width: 80,
        height: 80,
    },
    ligueInfo: {
        alignItems: 'center',
    },
    ligueName: {
        width: 50,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 17,
        marginTop: 5,
        paddingVertical: 5,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    infoLoading: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 50,
    },
    loadingText: {
        color: '#323D65',
        fontSize: 19,
    },
    loading: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 130,
        maxHeight: 130,
    },
    textInfoLoading: {
        width: 350,
        color: '#ffffff',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitText: {
        fontSize: 19,
        color: '#ffffff',
        marginBottom: 25,
        fontWeight: '400',
    },
    exitButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: '#EBECF0',
    },
})
