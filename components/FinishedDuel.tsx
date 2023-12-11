import React from 'react'
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import Header from './mode/Header'
import Board from './profil/ Board'
import List from './finishduel/List'

export default () => {
    const user = useSelector((state: any) => state.user)
    const { pseudo } = user

    return (
        <View
            style={{
                ...Style.container,
                marginTop: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header />
            <ScrollView>
                <View style={Style.body}>
                    <Board pseudo={pseudo} />
                    <List />
                </View>
            </ScrollView>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
})
