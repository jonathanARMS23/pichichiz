/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    useWindowDimensions,
    StyleSheet,
    ActivityIndicator,
    Image,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useAppSelector } from '../../../store/hooks/hooks'
import SerieStore from '../../../services/store/Serie'
import DuelStore from '../../../services/store/Duel'

interface ISProps {
    serie: number
    series: number
    result: any
}

interface IIProps {
    name: string
    result: Array<any> | null
}

const Item = ({ name, result }: IIProps) => {
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        if (!result) setWaiting(true)
        else setWaiting(false)
    }, [])

    return (
        <View style={Style.item}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{name}</Text>
            {waiting ? (
                <Text style={{ color: '#FFFFFF' }}>En attente...</Text>
            ) : (
                <View style={Style.stars}>
                    {result
                        ? result.map((el: any, index: number) => (
                              <Icon
                                  key={index}
                                  name="star"
                                  height={15}
                                  width={15}
                                  fill={el.valid ? `#31CCC0` : `#CC317C`}
                              />
                          ))
                        : null}
                </View>
            )}
        </View>
    )
}

const Serie = ({ series, result }: ISProps) => {
    const getBackgroundColor = () => {
        // if (result.win === 2) return serie === series ? '#1B2444' : '#323D65'
        if (result.win === 0) return '#EBECF0'
        if (result.win === -1) return '#CC317C'
        if (result.win === 1) return '#31CCC0'
        return '#323D65'
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 46,
                minHeight: 46,
                maxWidth: 46,
                maxHeight: 46,
                borderRadius: 23,
                backgroundColor: getBackgroundColor(),
                borderWidth: 1,
                borderColor: '#1B2444',
            }}
        >
            <Text style={{ color: '#1B2444' }}>{series}</Text>
        </View>
    )
}

export default () => {
    const { width } = useWindowDimensions()
    const User = useAppSelector((state) => state.user)
    const Duel = useAppSelector((state) => state.duel)
    const [loaded, setLoaded] = useState(false)
    const [result_player1, setResult_player1] = useState<Array<any> | null>(
        null
    )
    const [result_player2, setResult_player2] = useState<Array<any> | null>(
        null
    )
    const [result, setResult] = useState<Array<any>>([])
    const [winned, setWinned] = useState(false)
    const [winner, setWinner] = useState('')

    useEffect(() => {
        const API = new DuelStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed) {
                const response = await API.getDuelWinner(
                    parseInt(`${Duel.id_duel}`, 10)
                )
                if (response && !response.canceled) {
                    if (
                        parseInt(`${response.winner}`, 10) ===
                        parseInt(`${User.id}`, 10)
                    )
                        setWinned(true)
                    else {
                        setWinned(false)
                        setWinner(response.pseudo)
                    }
                }
            }
        })()

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [])

    useEffect(() => {
        const API = new SerieStore()
        let isSubscribed = true
        setLoaded(false)
        ;(async () => {
            if (isSubscribed) {
                const player =
                    parseInt(`${Duel.id_player1}`, 10) ===
                    parseInt(`${User.id}`, 10)
                        ? 1
                        : 2
                const response = await API.GetSerieResult(
                    parseInt(`${Duel.id_serie}`, 10)
                )
                if (!response.canceled) {
                    setResult_player1(
                        response.player1Road.length > 0
                            ? response.player1Road
                            : null
                    )
                    setResult_player2(
                        response.player2Road.length > 0
                            ? response.player2Road
                            : null
                    )

                    const SR_response = await API.GetSeriesResult(
                        parseInt(`${Duel.id_duel}`, 10),
                        player
                    )
                    console.log(SR_response)
                    if (!SR_response.canceled) {
                        setResult(SR_response.results)
                        // setWinner(SR_response.winner)
                        setLoaded(true)
                    }
                }
            }
        })()

        return () => {
            API.Cancel()
            isSubscribed = false
        }
    }, [Duel, User])

    if (!loaded)
        return (
            <View style={Style.loading}>
                <ActivityIndicator size="large" color="#323D65" />
                <Text style={Style.loadingText}>CHARGEMENT</Text>
            </View>
        )

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <ImageBackground
                source={require('../../../assets/images/victory.png')}
                style={Style.motif}
            >
                <ImageBackground
                    source={require('../../../assets/images/victoryElipse.png')}
                    style={Style.elipse}
                >
                    {winned ? (
                        <Image
                            source={require('../../../assets/images/winned.png')}
                            style={{ height: 121.55, width: 83.56 }}
                        />
                    ) : (
                        <Image
                            source={require('../../../assets/images/losed.png')}
                            style={{ height: 119, width: 119 }}
                        />
                    )}
                    {winned ? (
                        <Text
                            style={{
                                color: '#FFFFFF',
                                minWidth: 350,
                                maxWidth: 350,
                                textAlign: 'center',
                            }}
                        >
                            BRAVO TU AS REMPORTÉ LE DUEL !
                        </Text>
                    ) : (
                        <Text
                            style={{
                                color: '#FFFFFF',
                                minWidth: 350,
                                maxWidth: 350,
                                textAlign: 'center',
                            }}
                        >
                            BIEN JOUÉ!
                        </Text>
                    )}
                    {!winned ? (
                        <Text
                            style={{
                                color: '#FFFFFF',
                                minWidth: 350,
                                maxWidth: 350,
                                textAlign: 'center',
                            }}
                        >
                            {`MAIS C'EST ${winner} QUI GAGNE LE DUEL`.toUpperCase()}
                        </Text>
                    ) : null}
                </ImageBackground>
            </ImageBackground>
            <View style={Style.Series}>
                <Text style={{ color: '#FFFFFF' }}>SERIES</Text>
                <View style={Style.seriesList}>
                    {result.map((item, index) => (
                        <Serie
                            key={`serie${index}`}
                            serie={5}
                            series={index + 1}
                            result={item}
                        />
                    ))}
                </View>
            </View>
            <View style={Style.resultat}>
                <View style={Style.resultTitleContainer}>
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        Résultats
                    </Text>
                </View>
                <Item name={Duel.pseudo_player1} result={result_player1} />
                <Item
                    name={Duel.pseudo_player2 ?? 'Random'}
                    result={result_player2}
                />
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 444,
        maxHeight: 444,
    },
    motif: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 124,
        maxHeight: 124,
        minWidth: 245.13,
        maxWidth: 245.13,
    },
    elipse: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 105,
        maxHeight: 105,
        minWidth: 105,
        maxWidth: 105,
    },
    Series: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 85,
        maxHeight: 85,
    },
    seriesList: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 325,
        maxWidth: 325,
    },
    resultat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 160,
        maxHeight: 160,
    },
    resultTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 45,
        maxHeight: 45,
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 57.5,
        maxHeight: 57.5,
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
    },
    stars: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 120,
        maxWidth: 120,
        minHeight: 57.5,
        maxHeight: 57.5,
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
})
