import React from 'react'
import { View, ScrollView, Platform, StyleSheet } from 'react-native'
import Header from './mode/Header'
import Store from './store/store'

export default () => (
    <View
        style={{
            ...Style.container,
            marginTop: Platform.OS === 'ios' ? 25 : 0,
        }}
    >
        <Header />
        <ScrollView>
            <Store />
        </ScrollView>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
