import React, { useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { Initialize, setUser } from '../store/reducers/user'
import { RootStackParams } from '../navigation/tool/tool'
import {
    getPlayerCareer,
    getPlayerScore,
    InitCareer,
    setPlayerScore,
    getPlayerHP,
    setPlayerHP,
    getUserFromStorage,
} from '../services/factory/User'
import { InitializeBonus, getBonus } from '../services/factory/bonus'

type HomeNav = StackNavigationProp<RootStackParams, 'home'>

export default () => {
    const navigation = useNavigation<HomeNav>()
    const dispatch = useDispatch()

    // effect pour initialiser le palier et pour verifier si un joueur est sauvegardé dans le localstorage
    useEffect(() => {
        ;(async () => {
            // verification si un joueur est sauvegardé dans le localstorage
            const data = await getUserFromStorage()
            if (data) {
                dispatch(setUser(data))

                navigation.navigate('room', { screen: 'main' })
            }
        })()
    }, [])

    // si on veut logger un utilisateur
    const onSignin = () => {
        navigation.navigate('signin')
    }

    // si on veut inscrire un utilisateur
    const onSignup = () => {
        navigation.navigate('signup')
    }

    // si on veut jouer sans connexion
    const onNext = async () => {
        // verification du score
        let score = await getPlayerScore()
        if (!score) {
            await setPlayerScore(0)
            score = await getPlayerScore()
        }

        // verification du parcour du joueur
        let career = await getPlayerCareer()
        if (!career) {
            await InitCareer()
            career = await getPlayerCareer()
        }

        // verification du HP du joueur
        let hp = await getPlayerHP()
        if (!hp) {
            await setPlayerHP(10)
            hp = await getPlayerHP()
        }

        // verification des bonus du joueur
        let bonus = await getBonus()
        if (!bonus) {
            await InitializeBonus()
            bonus = await getBonus()
        }

        dispatch(Initialize({ hp, score, career }))
        navigation.navigate('room', { screen: 'main' })
    }

    return (
        <View style={Style.container}>
            <View style={Style.logoContainer}>
                <Image
                    source={require('../assets/images/quiz.png')}
                    style={Style.logo}
                />
            </View>
            <View style={Style.legendContainer}>
                <Text>Bienvenu sur le jeu Quiz de footballdatabase !</Text>
                <Text>Testons vos connaissance du football</Text>
            </View>
            <View style={Style.imageContainer}>
                <Image
                    source={require('../assets/images/home.png')}
                    style={Style.image}
                />
            </View>
            <View style={Style.footer}>
                <View style={Style.firstSection}>
                    <TouchableOpacity onPress={onNext} style={Style.buttonGM}>
                        <Text>Jouer sans connexion</Text>
                    </TouchableOpacity>
                </View>
                <View style={Style.secondSection}>
                    <TouchableOpacity onPress={onSignin} style={Style.buttonPM}>
                        <Text>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onSignup}
                        style={{
                            ...Style.buttonPM,
                            backgroundColor: '#1B2444',
                        }}
                    >
                        <Text style={Style.darkButtonText}>
                            Créer un compte
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 100,
        minHeight: 100,
    },
    logo: {
        height: 35,
        width: 220,
    },
    legendContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 150,
        minHeight: 150,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 250,
        width: 250,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 150,
        maxHeight: 150,
    },
    firstSection: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 60,
        maxHeight: 60,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonGM: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#EBECF0',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
    },
    buttonPM: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1B2444',
        minWidth: 175,
        maxWidth: 175,
        minHeight: 50,
        maxHeight: 50,
    },
    darkButtonText: {
        color: '#FFFFFF',
    },
})
