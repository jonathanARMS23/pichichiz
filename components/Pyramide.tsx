import {
    View,
    Text,
    useWindowDimensions,
    Platform,
    StyleSheet,
} from 'react-native'
import React from 'react'
import Header from './mode/Header'
import Banner from './pyramide/Banner'
import Invitations from './pyramide/Invitations'

const data = [
    {
        actif: true,
        name: 'Laulau4',
        user: 'me',
    },
    {
        actif: true,
        name: 'ArnaudK',
    },
    {
        actif: false,
        name: 'Jonathan',
    },
]

export default () => {
    const { width } = useWindowDimensions()
    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginVertical: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header isDuel />
            <Banner />
            <Invitations />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingVertical: 10,
    },
})
