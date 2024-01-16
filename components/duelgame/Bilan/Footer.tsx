import React from 'react'
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
import { clearDuel, CreateDuel } from '../../../store/reducers/duel'
import { useAppSelector } from '../../../store/hooks/hooks'
import DuelStore from '../../../services/store/Duel'
import SerieStore, { Type } from '../../../services/store/Serie'

type FooterNavProp = StackNavigationProp<RootStackParams, 'bilan'>

export default () => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const Duel = useAppSelector((state) => state.duel)
    const User = useAppSelector((state) => state.user)
    const dispatch = useDispatch()

    const onCancel = () => {
        dispatch(clearDuel())
        navigation.navigate('duel')
    }

    const onFight = async () => {
        const opponent =
            parseInt(`${User.id}`, 10) === parseInt(`${Duel.id_player1}`, 10)
                ? parseInt(`${Duel.id_player2}`, 10)
                : parseInt(`${Duel.id_player1}`, 10)

        if (User.id && opponent) {
            const API = new DuelStore()
            const SAPI = new SerieStore()
            const D_response = await API.CreateDuel(
                parseInt(`${User.id}`, 10),
                opponent
            )
            if (!D_response.canceled) {
                const S_response = await SAPI.CreateSerie(
                    D_response.id_duel,
                    Type.CLASSIC
                )
                if (!S_response.canceled) {
                    const player1 = D_response.user
                    const player2 = D_response.vs
                    dispatch(
                        CreateDuel({
                            id_player1: player1.id,
                            pseudo_player1: player1.pseudo,
                            id_player2: player2.id,
                            pseudo_player2: player2.pseudo,
                            score_player1: 0,
                            score_player2: 0,
                            id_duel: D_response.id_duel,
                            id_serie: S_response.id_serie,
                            winner: null,
                        })
                    )
                    navigation.navigate('duelgame', {
                        id_duel: D_response.id_duel,
                        id_serie: S_response.id_serie,
                    })
                }
            }
        }
        // navigation.navigate('duelgame', { vs: data.pseudo })
    }

    if (parseInt(`${Duel.winner}`, 10) === parseInt(`${User.id}`, 10))
        return (
            <View
                style={{ ...Style.container, minWidth: width, maxWidth: width }}
            >
                <Text style={Style.title}>Quitter</Text>
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

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <TouchableOpacity onPress={onFight} style={Style.revenge}>
                <Text style={{ color: '#1B2444' }}>REVANCHE</Text>
                <Icon
                    name="arrow-forward-outline"
                    fill="#1B2444"
                    height={35}
                    width={35}
                />
            </TouchableOpacity>
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
