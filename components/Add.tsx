import React from 'react'
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import Header from './sous-components/Header'
import Add from './add/Add'

export default () => (
    <View
        style={{
            ...Style.container,
            marginTop: Platform.OS === 'ios' ? 25 : 0,
        }}
    >
        <ScrollView>
            <Header />
            <Add />
        </ScrollView>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
