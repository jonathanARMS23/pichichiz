import React from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import Header from '../duelgame/Finished/Header'
import Footer from '../duelgame/Finished/Footer'
import Result from './Result'

interface IProps {
    serie: number // numero du serie
    name: string
    isFinished: boolean
    isEqual: boolean
    duel: any
}

export default ({ serie, name, isFinished, isEqual, duel }: IProps) => {
    const { width, height } = useWindowDimensions()

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                maxWidth: width,
                minHeight: height,
                maxHeight: height,
            }}
        >
            <Header name={name} />
            <Result serie={serie} isFinished={isFinished} Duel={duel} />
            <Footer isFinished={isFinished} isEqual={isEqual} />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1B2444',
    },
})
