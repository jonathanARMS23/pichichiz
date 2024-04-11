import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Platform,
} from 'react-native'
import React from 'react'
import Banner from './Banner'
import Header from '../../mode/Header'
import { COLORS } from '../../../utiles/constantes'

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
            <Header />
            <Banner />
            <View style={Style.content}>
                <Text style={Style.title}>
                    PRÉNOM DES AUTRES PARTICIPANTS:{' '}
                </Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    content: {
        flex: 1,
        minWidth: '90%',
        maxWidth: '90%',
        marginTop: 20,
    },
    title: {
        width: '100%',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        color: COLORS.primary,
        borderBottomColor: COLORS.light_primary,
        height: 30,
        textAlignVertical: 'center',
    },
})
