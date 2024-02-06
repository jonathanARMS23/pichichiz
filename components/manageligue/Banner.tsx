import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'

export default () => {
    const { width } = useWindowDimensions()

    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <View style={Style.imageWrapper}>
                <Text style={{ fontWeight: 'bold' }}>
                    CRÉER UNE LIGUE - RÉGLAGES
                </Text>
            </View>
            <View style={Style.controls}></View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 70,
        maxHeight: 70,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 300,
        maxWidth: 300,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFC085',
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 40,
        maxHeight: 50,
        minWidth: 70,
        maxWidth: 70,
    },
})
