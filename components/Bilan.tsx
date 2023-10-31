import React from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import Header from './duelgame/Bilan/Header'
import Footer from './duelgame/Bilan/Footer'
import Result from './duelgame/Bilan/Result'

export default () => {
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
            <Header />
            <Result />
            <Footer />
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
