import React from 'react'
import { View, StyleSheet } from 'react-native'
import Home from '../components/Home'

export default () => (
    <View style={Style.container}>
        <Home />
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
})
