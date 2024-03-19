import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    FlatList,
} from 'react-native'
import React from 'react'
import DailyOpponent from './dailyOpponent'
import { COLORS } from '../../../utiles/constantes'
import ItemDuel from './itemDuel'

interface IProps {
    setScreen: Function
}

const data = [
    {
        finished: true,
        player1: {
            nom: 'Danyz',
            score: 2,
        },
        player2: {
            nom: 'Brillant',
            score: 1,
        },
    },
    {
        finished: true,
        player1: {
            nom: 'bammyHall',
            score: 3,
        },
        player2: {
            nom: 'didiboot',
            score: 0,
        },
    },
    {
        finished: true,
        player1: {
            nom: 'Normaalvarez',
            score: 1,
        },
        player2: {
            nom: 'Brillant',
            score: 1,
        },
    },
    {
        finished: false,
        player1: {
            nom: 'Jonathan',
            score: 0,
        },
        player2: {
            nom: 'Salim',
            score: 2,
        },
        manche1: 'Salim',
        manche2: 'Salim',
        manche3: '',
    },
    {
        finished: false,
        player1: {
            nom: 'aunaWilson',
            score: 0,
        },
        player2: {
            nom: 'bibiHolmes',
            score: 2,
        },
        manche1: 'aunaWilson',
        manche2: 'bibiHolmes',
        manche3: 'bibiHolmes',
    },
    {
        finished: false,
        player1: {
            nom: 'aDixon',
            score: 0,
        },
        player2: {
            nom: 'jon',
            score: 2,
        },
        manche1: 'aDixon',
        manche2: 'aDixon',
        manche3: 'aDixon',
    },
]

export default ({ setScreen }: IProps) => {
    const { width } = useWindowDimensions()
    console.log('screen width: ', width)

    return (
        <View style={{ ...Style.container, width: 375 }}>
            <Text style={Style.title}>MON ADVERSAIRE DU JOUR</Text>
            <DailyOpponent />
            <Text style={Style.title}>
                LISTE DES AFFRONTEMENTS DE LA JOURNEE
            </Text>
            <FlatList
                style={{ width: 375 }}
                data={data}
                keyExtractor={(item, index) => `duel${index}`}
                renderItem={({ item }) => <ItemDuel data={item} />}
            />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'grey',
    },
    title: {
        color: COLORS.primary,
        fontWeight: 'bold',
        height: 60,
        textAlignVertical: 'bottom',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
})
