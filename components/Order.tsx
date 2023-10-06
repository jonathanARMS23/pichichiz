import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from './sous-components/Header'
import Order from './order/order'

export default () => (
    <View style={Style.container}>
        <Header />
        <Order />
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E5F1',
        alignItems: 'center',
    },
})
