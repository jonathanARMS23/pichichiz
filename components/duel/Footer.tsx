import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import { CreateDuel } from '../../store/reducers/duel'
import DuelStore from '../../services/store/Duel'
import SerieStore, { Type } from '../../services/store/Serie'

type DuelNavProp = StackNavigationProp<RootStackParams, 'duel'>

export default () => {
    const navigation = useNavigation<DuelNavProp>()
    const User = useSelector((state: any) => state.user)
    const Dispatch = useDispatch()

    const handlePress = async () => {
        if (User.id) {
            const API = new DuelStore()
            const SAPI = new SerieStore()
            const D_response = await API.CreateDuelInShuffle(
                parseInt(`${User.id}`, 10)
            )
            if (!D_response.canceled) {
                const S_response = await SAPI.CreateSerie(
                    D_response.id_duel,
                    Type.CLASSIC
                )
                if (!S_response.canceled) {
                    const player1 = D_response.user
                    const player2 = D_response.vs
                    Dispatch(
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
    }

    return (
        <View
            style={{
                ...Style.footer,
            }}
        >
            <TouchableOpacity
                style={{ ...Style.buttonAdd, ...Style.elevation }}
                onPress={handlePress}
            >
                <Text
                    style={Style.buttonAddText}
                >{`  DÉFIER UN JOUEUR AU HASARD`}</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    elevation: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#1B2444',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})
