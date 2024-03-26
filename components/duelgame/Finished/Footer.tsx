/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { RNAatkit } from '@addapptr/react-native-aatkit'
import { Icon } from 'react-native-eva-icons'
import { useDispatch } from 'react-redux'
import { Bar } from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { PLACEMENT } from '../../../pubs'
import { RootStackParams } from '../../../navigation/tool/tool'
import { clearDuel, setWinner } from '../../../store/reducers/duel'
import { useAppSelector } from '../../../store/hooks/hooks'
import DuelStore from '../../../services/store/Duel'
import socket from '../../../services/socket/socket'

type FooterNavProp = StackNavigationProp<RootStackParams, 'sologame'>

interface IProps {
    isEqual?: boolean
    isFinished: boolean
}

export default ({ isFinished, isEqual = false }: IProps) => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const { haveAd } = useAppSelector((state) => state.pubs)
    const dispatch = useDispatch()
    const Duel = useAppSelector((state) => state.duel)
    const User = useAppSelector((state) => state.user)
    const [load, setLoad] = useState(false)

    const duration = 4000

    const [progress, setProgress] = useState(0)
    const incrementRate = (100 / duration) * 100 // Calcul du taux d'incrémentation pour atteindre 100% en "totalDuration" millisecondes

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress((prevProgress) =>
                    Math.min(prevProgress + incrementRate, 100)
                ) // Assure que la progression n'excède pas 100
            } else {
                clearInterval(interval)
            }
        }, duration / 100) // Intervalle de mise à jour basé sur le temps total nécessaire pour atteindre 100%

        return () => clearInterval(interval) // Nettoyage de l'intervalle lorsque le composant est démonté
    }, [progress, duration, incrementRate])

    const onCancel = () => {
        dispatch(clearDuel())
        navigation.navigate('duel')
    }

    useEffect(() => {
        setLoad(false)
        let timeout: any
        if (haveAd) {
            timeout = setTimeout(() => {
                RNAatkit.showPlacement(PLACEMENT, (inter) =>
                    console.log('show placement', inter)
                )
                setLoad(true)
            }, duration)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [haveAd])

    useEffect(() => {
        const API = new DuelStore()
        let isSubscribe = true
        if (!isFinished) return
        ;(async () => {
            if (isSubscribe) {
                const response = await API.GetDuelById(
                    parseInt(`${Duel.id_duel}`, 10)
                )
                if (response && !response.canceled) {
                    const id =
                        parseInt(`${Duel.id_player1}`, 10) ===
                        parseInt(`${User.id}`, 10)
                            ? Duel.id_player2
                            : Duel.id_player1
                    socket.emit('duel_finished', {
                        id_duel: Duel.id_duel,
                        id_user: id,
                    })
                    dispatch(setWinner(response.winner))
                }
            }
        })()

        return () => {
            isSubscribe = false
            API.Cancel()
        }
    }, [isFinished])

    const onShowResult = () => {
        navigation.navigate('bilan')
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            {isEqual ? (
                <Text style={Style.title}>Egalité, place aux "tir au but"</Text>
            ) : null}
            {isFinished ? <Text style={Style.title}>Fin du duel</Text> : null}
            {isFinished && Duel.winner ? (
                <TouchableOpacity
                    disabled={!load}
                    onPress={onShowResult}
                    style={{ ...Style.revenge, opacity: !load ? 0.5 : 1 }}
                >
                    <Text style={{ color: '#1B2444' }}>VOIR LE RESULTAT</Text>
                    <Icon
                        name="arrow-forward-outline"
                        fill="#1B2444"
                        height={35}
                        width={35}
                    />
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity
                disabled={!load}
                onPress={onCancel}
                style={{ ...Style.cancel, opacity: !load ? 0.5 : 1 }}
            >
                <Icon
                    name="close-outline"
                    fill="#FFFFFF"
                    height={35}
                    width={35}
                />
            </TouchableOpacity>
            <Bar progress={progress} width={100} color="#EBECF0" />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 177,
        maxHeight: 177,
    },
    cancel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 51,
        maxHeight: 51,
        minWidth: 51,
        maxWidth: 51,
        borderRadius: 25.5,
        backgroundColor: '#323D65',
    },
    title: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 15,
    },
    revenge: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: 194,
        maxWidth: 194,
        minHeight: 60,
        maxHeight: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
})
