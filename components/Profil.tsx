import React from 'react'
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import Header from './mode/Header'
import Board from './profil/ Board'
import Menu from './profil/Menu'
import BottomMenu from './profil/BottomMenu'

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
                    <Menu />
                    <View style={Style.space}></View>
                    <BottomMenu />
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
    space: {
        flex: 1,
        minHeight: 100,
    },
})
