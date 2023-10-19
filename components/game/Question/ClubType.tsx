import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    useWindowDimensions,
    StyleSheet,
    FlatList,
} from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

const Player = ({ data }: IProps) => (
    <View style={Style.player}>
        <Image
            source={require('../../../assets/images/ball.png')}
            style={Style.ball}
        />
        <Text
            style={Style.name}
        >{`   ${data.first_name} ${data.last_name}`}</Text>
    </View>
)

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<any>(null)
    const [scoring, setScoring] = useState<Array<any>>([])
    const [scoring_vs, setScoring_vs] = useState<Array<any>>([])

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) {
            const infoData = extract[0]
            if (Array.isArray(infoData.scoring)) setScoring(infoData.scoring)
            if (Array.isArray(infoData.scoring_vs))
                setScoring_vs(infoData.scoring_vs)
            setInfo(infoData)
        }
    }, [])

    const isChampionnat = () => {
        const hasJournee = `${info.text}`.toLowerCase().includes('journée')
        return hasJournee
    }

    if (!info) return null

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <Image
                source={{
                    uri: `${info.logo_comp}`,
                }}
                style={Style.logo}
            />
            <View style={Style.info}>
                <Text style={Style.text}>{`${info.text}`}</Text>
                <Text style={Style.text}>{`${info.date}`}</Text>
            </View>
            <View
                style={
                    (scoring.length > 0 || scoring_vs.length > 0) &&
                    !isChampionnat()
                        ? { ...Style.match, minHeight: 147, maxHeight: 147 }
                        : Style.match
                }
            >
                <View
                    style={
                        (scoring.length > 0 || scoring_vs.length > 0) &&
                        !isChampionnat()
                            ? {
                                  ...Style.section,
                                  minWidth: 144,
                                  maxWidth: 144,
                                  minHeight: 147,
                                  maxHeight: 147,
                              }
                            : {
                                  ...Style.section,
                                  minWidth: 144,
                                  maxWidth: 144,
                                  minHeight: 60,
                                  maxHeight: 60,
                              }
                    }
                >
                    <View
                        style={{
                            ...Style.clubs,
                            minWidth: 144,
                            maxWidth: 144,
                            minHeight: 60,
                            maxHeight: 60,
                        }}
                    >
                        <Image
                            source={require('../../../assets/images/question.png')}
                            style={Style.icon}
                        />
                    </View>
                    {!isChampionnat() ? (
                        <FlatList
                            data={scoring}
                            keyExtractor={(item, index) => `player${index}`}
                            renderItem={({ item }) => <Player data={item} />}
                        />
                    ) : null}
                </View>
                <View
                    style={
                        (scoring.length > 0 || scoring_vs.length > 0) &&
                        !isChampionnat()
                            ? {
                                  ...Style.section,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                  paddingTop: 10,
                                  minHeight: 147,
                                  maxHeight: 147,
                              }
                            : {
                                  ...Style.section,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  minHeight: 60,
                                  maxHeight: 60,
                              }
                    }
                >
                    <Text
                        style={Style.score}
                    >{`${scoring.length} - ${scoring_vs.length}`}</Text>
                </View>
                <View
                    style={
                        (scoring.length > 0 || scoring_vs.length > 0) &&
                        !isChampionnat()
                            ? {
                                  ...Style.section,
                                  minWidth: 144,
                                  maxWidth: 144,
                                  minHeight: 147,
                                  maxHeight: 147,
                              }
                            : {
                                  ...Style.section,
                                  minWidth: 144,
                                  maxWidth: 144,
                                  minHeight: 60,
                                  maxHeight: 60,
                              }
                    }
                >
                    <View
                        style={{
                            ...Style.clubs,
                            minWidth: 144,
                            maxWidth: 144,
                            minHeight: 60,
                            maxHeight: 60,
                        }}
                    >
                        <Text
                            style={{
                                ...Style.club,
                                minWidth: 144,
                                maxWidth: 144,
                            }}
                        >{`${info.vs}`}</Text>
                    </View>
                    {!isChampionnat ? (
                        <FlatList
                            data={scoring_vs}
                            keyExtractor={(item, index) => `playervs${index}`}
                            renderItem={({ item }) => <Player data={item} />}
                        />
                    ) : null}
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 320,
        maxHeight: 320,
    },
    logo: {
        minHeight: 89,
        maxHeight: 89,
        minWidth: 90,
        maxWidth: 90,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    match: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 62,
        maxHeight: 62,
        minWidth: 339,
        maxWidth: 339,
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 10,
        paddingVertical: 3,
    },
    club: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    score: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    icon: {
        height: 43.21,
        width: 41.6,
    },
    section: {
        flex: 1,
        minHeight: 60,
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 150,
        maxWidth: 150,
        minHeight: 16,
        maxHeight: 16,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    ball: {
        height: 12,
        width: 12,
    },
    name: {
        fontSize: 10,
    },
    clubs: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
