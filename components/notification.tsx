import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from './notification/Header'
import Notification from './notification/notifications'

export default () => (
    <View style={Style.container}>
        <Header />
        <Notification />
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
})
