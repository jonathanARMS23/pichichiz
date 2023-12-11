/* eslint-disable no-lonely-if */
import React, { useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import { CreateDuel } from '../../store/reducers/duel'
import Statut from '../sous-components/Statut'
import SerieStore from '../../services/store/Serie'
import DuelStore from '../../services/store/Duel'

interface IIProps {
    data: any
}

interface IProps {
    data: Array<any>
}

type DuelNavProp = StackNavigationProp<RootStackParams, 'duel'>

const Item = ({ data }: IIProps) => {
    const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<DuelNavProp>()
    const Dispatch = useDispatch()

    useEffect(() => {
        console.log(parseInt(`${User.id}`, 10) === parseInt(`${data.turn}`, 10))
        console.log(parseInt(`${User.id}`, 10))
        console.log(parseInt(`${data.turn}`, 10))
        console.log(data)
        console.log(User)
    }, [])

    const onFight = async () => {
        if (data.id_duel) {
            const API = new SerieStore()
            const DAPI = new DuelStore()
            // récupérer la série en cours (il n'y a qu'une seule série en cours par duel)
            const response = await API.GetInProgressSerie(data.id_duel)
            if (!response.canceled) {
                // récupération des informations du duel pour initialiser le state global
                const D_response = await DAPI.GetDuelById(data.id_duel)
                if (!D_response.canceled) {
                    const player1 = D_response.user
                    const player2 = D_response.vs
                    Dispatch(
                        CreateDuel({
                            id_player1: player1.id,
                            pseudo_player1: player1.pseudo,
                            id_player2: player2.id,
                            pseudo_player2: player2.pseudo,
                            score_player1: player1.score ?? 0,
                            score_player2: player2.score ?? 0,
                            id_duel: D_response.id_duel,
                            id_serie: response.id_serie,
                            winner: null,
                        })
                    )
                    console.log({
                        id_player1: player1.id,
                        pseudo_player1: player1.pseudo,
                        id_player2: player2.id,
                        pseudo_player2: player2.pseudo,
                        score_player1: player1.score ?? 0,
                        score_player2: player2.score ?? 0,
                        id_duel: D_response.id_duel,
                        id_serie: response.id_serie,
                    })
                    navigation.navigate('duelgame', {
                        id_duel: data.id_duel,
                        id_serie: response.id_serie,
                    })
                }
            }
        }
    }

    const onLoadResult = async () => {
        if (data.id_duel) {
            const API = new SerieStore()
            const DAPI = new DuelStore()
            const myTurn =
                !data.turn ||
                parseInt(`${User.id}`, 10) === parseInt(`${data.turn}`, 10)

            if (
                parseInt(`${User.id}`, 10) === parseInt(`${data.id_user}`, 10)
            ) {
                if (myTurn) {
                    if (data.lastSerie) {
                        const D_response = await DAPI.GetDuelById(data.id_duel)
                        if (!D_response.canceled) {
                            const player1 = D_response.user
                            const player2 = D_response.vs
                            Dispatch(
                                CreateDuel({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: data.lastSerie,
                                    winner: null,
                                })
                            )
                            console.log({
                                id_player1: player1.id,
                                pseudo_player1: player1.pseudo,
                                id_player2: player2.id,
                                pseudo_player2: player2.pseudo,
                                score_player1: player1.score ?? 0,
                                score_player2: player2.score ?? 0,
                                id_duel: D_response.id_duel,
                                id_serie: data.lastSerie,
                                winner: null,
                            })
                            navigation.navigate('results', {
                                id_duel: D_response.id_duel,
                                id_serie: data.lastSerie,
                            })
                        }
                    } else {
                        // récupérer la série en cours (il n'y a qu'une seule série en cours par duel)
                        const response = await API.GetInProgressSerie(
                            data.id_duel
                        )
                        if (!response.canceled) {
                            // récupération des informations du duel pour initialiser le state global
                            const D_response = await DAPI.GetDuelById(
                                data.id_duel
                            )
                            if (!D_response.canceled) {
                                const player1 = D_response.user
                                const player2 = D_response.vs
                                Dispatch(
                                    CreateDuel({
                                        id_player1: player1.id,
                                        pseudo_player1: player1.pseudo,
                                        id_player2: player2.id,
                                        pseudo_player2: player2.pseudo,
                                        score_player1: player1.score ?? 0,
                                        score_player2: player2.score ?? 0,
                                        id_duel: D_response.id_duel,
                                        id_serie: response.id_serie,
                                        winner: null,
                                    })
                                )
                                console.log({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                })
                                navigation.navigate('results', {
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                })
                            }
                        }
                    }
                } else {
                    // récupérer la série en cours (il n'y a qu'une seule série en cours par duel)
                    const response = await API.GetInProgressSerie(data.id_duel)
                    if (!response.canceled) {
                        // récupération des informations du duel pour initialiser le state global
                        const D_response = await DAPI.GetDuelById(data.id_duel)
                        if (!D_response.canceled) {
                            const player1 = D_response.user
                            const player2 = D_response.vs
                            Dispatch(
                                CreateDuel({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                    winner: null,
                                })
                            )
                            console.log({
                                id_player1: player1.id,
                                pseudo_player1: player1.pseudo,
                                id_player2: player2.id,
                                pseudo_player2: player2.pseudo,
                                score_player1: player1.score ?? 0,
                                score_player2: player2.score ?? 0,
                                id_duel: D_response.id_duel,
                                id_serie: response.id_serie,
                            })
                            navigation.navigate('results', {
                                id_duel: D_response.id_duel,
                                id_serie: response.id_serie,
                            })
                        }
                    }
                }
            } else {
                if (myTurn) {
                    // récupérer la série en cours (il n'y a qu'une seule série en cours par duel)
                    const response = await API.GetInProgressSerie(data.id_duel)
                    if (!response.canceled) {
                        // récupération des informations du duel pour initialiser le state global
                        const D_response = await DAPI.GetDuelById(data.id_duel)
                        if (!D_response.canceled) {
                            const player1 = D_response.user
                            const player2 = D_response.vs
                            Dispatch(
                                CreateDuel({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                    winner: null,
                                })
                            )
                            console.log({
                                id_player1: player1.id,
                                pseudo_player1: player1.pseudo,
                                id_player2: player2.id,
                                pseudo_player2: player2.pseudo,
                                score_player1: player1.score ?? 0,
                                score_player2: player2.score ?? 0,
                                id_duel: D_response.id_duel,
                                id_serie: response.id_serie,
                            })
                            navigation.navigate('results', {
                                id_duel: D_response.id_duel,
                                id_serie: response.id_serie,
                            })
                        }
                    }
                } else {
                    if (data.lastSerie) {
                        const D_response = await DAPI.GetDuelById(data.id_duel)
                        if (!D_response.canceled) {
                            const player1 = D_response.user
                            const player2 = D_response.vs
                            Dispatch(
                                CreateDuel({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: data.lastSerie,
                                    winner: null,
                                })
                            )
                            console.log({
                                id_player1: player1.id,
                                pseudo_player1: player1.pseudo,
                                id_player2: player2.id,
                                pseudo_player2: player2.pseudo,
                                score_player1: player1.score ?? 0,
                                score_player2: player2.score ?? 0,
                                id_duel: D_response.id_duel,
                                id_serie: data.lastSerie,
                            })
                            navigation.navigate('results', {
                                id_duel: D_response.id_duel,
                                id_serie: data.lastSerie,
                            })
                        }
                    } else {
                        // récupérer la série en cours (il n'y a qu'une seule série en cours par duel)
                        const response = await API.GetInProgressSerie(
                            data.id_duel
                        )
                        if (!response.canceled) {
                            // récupération des informations du duel pour initialiser le state global
                            const D_response = await DAPI.GetDuelById(
                                data.id_duel
                            )
                            if (!D_response.canceled) {
                                const player1 = D_response.user
                                const player2 = D_response.vs
                                Dispatch(
                                    CreateDuel({
                                        id_player1: player1.id,
                                        pseudo_player1: player1.pseudo,
                                        id_player2: player2.id,
                                        pseudo_player2: player2.pseudo,
                                        score_player1: player1.score ?? 0,
                                        score_player2: player2.score ?? 0,
                                        id_duel: D_response.id_duel,
                                        id_serie: response.id_serie,
                                        winner: null,
                                    })
                                )
                                console.log({
                                    id_player1: player1.id,
                                    pseudo_player1: player1.pseudo,
                                    id_player2: player2.id,
                                    pseudo_player2: player2.pseudo,
                                    score_player1: player1.score ?? 0,
                                    score_player2: player2.score ?? 0,
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                })
                                navigation.navigate('results', {
                                    id_duel: D_response.id_duel,
                                    id_serie: response.id_serie,
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={false} />
                <Text>{`  ${data.pseudo_vs}`}</Text>
            </View>
            <View style={Style.playerAction}>
                {parseInt(`${User.id}`, 10) === parseInt(`${data.turn}`, 10) ? (
                    <>
                        <TouchableOpacity
                            onPress={onFight}
                            style={{
                                ...Style.playerActionButton,
                                minWidth: 100,
                                maxWidth: 100,
                                minHeight: 40,
                                maxHeight: 40,
                            }}
                        >
                            <Text
                                style={Style.buttonFight}
                            >{` CONTINUER `}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Style.resultButton}
                            onPress={onLoadResult}
                        >
                            <Icon
                                name="bar-chart-outline"
                                height={20}
                                width={20}
                            />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={{ fontWeight: 'bold', color: '#1B2444' }}>
                            En attente...
                        </Text>
                        <TouchableOpacity
                            style={Style.resultButton}
                            onPress={onLoadResult}
                        >
                            <Icon
                                name="bar-chart-outline"
                                height={20}
                                width={20}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    )
}

export default ({ data }: IProps) => {
    if (!data) return null

    if (data.length === 0)
        return (
            <View style={Style.container}>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>DUEL EN COURS</Text>
                </View>
                <View style={Style.listContainer}>
                    <Icon
                        name="list-outline"
                        height={50}
                        width={50}
                        fill="#EBECF0"
                    />
                    <Text>Aucun duel en cours!</Text>
                </View>
            </View>
        )

    return (
        <View style={Style.container}>
            <View style={Style.titleContainer}>
                <Text style={Style.title}>DUEL EN COURS</Text>
            </View>
            <View style={Style.duelListContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => `duel${index}`}
                        renderItem={({ item }) => <Item data={item} />}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 100,
        maxHeight: 250,
        overflow: 'scroll',
    },
    duelListContainer: {
        flex: 1,
        minHeight: 100,
        maxHeight: 250,
        overflow: 'scroll',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
    },
    title: {
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 30,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#31CCC0',
    },
    buttonFight: {
        fontSize: 11,
    },
    resultButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: 40,
        maxWidth: 40,
        minHeight: 40,
        maxHeight: 40,
        marginLeft: 10,
    },
})
