import React from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import Header from './Finished/Header'
import Footer from './Finished/Footer'
import Result from './Finished/Result'

interface IProps {
    serie: number // numero du serie
    name: string
    isFinished: boolean
    isEqual: boolean
}

export default ({ serie, name, isFinished, isEqual }: IProps) => {
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
            <Result serie={serie} isFinished={isFinished} />
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
