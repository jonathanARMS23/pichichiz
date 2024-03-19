import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-eva-icons'
import { COLORS } from '../../../utiles/constantes'
import Statut from './statut'

interface IProps {
    data: any
}

interface IIProps {
    statut?: string
    nom: string
    data: any
}

export const Player = ({ statut, nom, data }: IIProps) => {
    switch (statut) {
        case 'win':
            return (
                <View
                    style={{
                        ...Style.playerContainer,
                        backgroundColor: COLORS.green,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            color: COLORS.primary,
                        }}
                    >
                        {nom}
                    </Text>
                </View>
            )
        case 'lose':
            return (
                <View
                    style={{
                        ...Style.playerContainer,
                        backgroundColor: COLORS.red,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            color: COLORS.very_light_primary,
                        }}
                    >
                        {nom}
                    </Text>
                </View>
            )
        case 'draw':
            return (
                <View
                    style={{
                        ...Style.playerContainer,
                        backgroundColor: COLORS.very_light_primary,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            color: COLORS.primary,
                        }}
                    >
                        {nom}
                    </Text>
                </View>
            )
        default:
            return (
                <View
                    style={{
                        ...Style.playerContainer,
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            color: COLORS.primary,
                        }}
                    >
                        {nom}
                    </Text>
                    <View style={Style.statut}>
                        <Statut
                            size={10}
                            actif={
                                data.manche1 === nom
                                    ? true
                                    : nom === data.player2.nom
                                    ? false
                                    : ''
                            }
                        />
                        <Statut
                            size={10}
                            actif={
                                nom === data.manche2
                                    ? true
                                    : nom === data.player2.nom
                                    ? false
                                    : ''
                            }
                        />
                        <Statut
                            size={10}
                            actif={
                                nom === data.manche1
                                    ? true
                                    : nom === data.player2.nom
                                    ? false
                                    : ''
                            }
                        />
                    </View>
                </View>
            )
    }
}

export default ({ data }: IProps) => {
    const score1 = data.player1.score
    const score2 = data.player2.score
    const finished = data.finished

    return finished ? (
        <View style={Style.container}>
            {score1 > score2 ? (
                <Player statut="win" nom={data.player1.nom} data={data} />
            ) : score1 < score2 ? (
                <Player statut="lose" nom={data.player1.nom} data={data} />
            ) : (
                <Player statut="draw" nom={data.player1.nom} data={data} />
            )}
            <Text style={Style.score}>
                {`${score1}`} - {`${score2}`}
            </Text>
            {score1 > score2 ? (
                <Player statut="lose" nom={data.player2.nom} data={data} />
            ) : score1 < score2 ? (
                <Player statut="win" nom={data.player2.nom} data={data} />
            ) : (
                <Player statut="draw" nom={data.player2.nom} data={data} />
            )}
        </View>
    ) : (
        <View style={Style.container}>
            <Player data={data} nom={data.player1.nom} />
            <Text style={Style.score}>VS</Text>
            <Player data={data} nom={data.player2.nom} />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    playerContainer: {
        flex: 3,
        backgroundColor: COLORS.very_light_primary,
        alignItems: 'center',
        minHeight: 40,
        maxHeight: 40,
        justifyContent: 'center',
        borderRadius: 10,
    },
    playerName: {
        color: '#ffffff',
    },
    statut: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 5,
    },
    score: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
})
