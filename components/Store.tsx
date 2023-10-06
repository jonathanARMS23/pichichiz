import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from './mode/Header'
import Store from './store/store'

export default () => (
    <View style={Style.container}>
        <Header />
        <Store />
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
