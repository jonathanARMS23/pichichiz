import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import Header from './sous-components/Header'

export default () => (
    <View style={Style.container}>
        <ScrollView>
            <Header />
        </ScrollView>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
