/* eslint-disable consistent-return */
import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
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
    const dispatch = useDispatch()
    const Duel = useAppSelector((state) => state.duel)
    const User = useAppSelector((state) => state.user)

    const onCancel = () => {
        dispatch(clearDuel())
        navigation.navigate('duel')
    }

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
                <TouchableOpacity onPress={onShowResult} style={Style.revenge}>
                    <Text style={{ color: '#1B2444' }}>VOIR LE RESULTAT</Text>
                    <Icon
                        name="arrow-forward-outline"
                        fill="#1B2444"
                        height={35}
                        width={35}
                    />
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={onCancel} style={Style.cancel}>
                <Icon
                    name="close-outline"
                    fill="#FFFFFF"
                    height={35}
                    width={35}
                />
            </TouchableOpacity>
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
