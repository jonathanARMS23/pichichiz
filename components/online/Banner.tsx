import React from 'react'
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native'

export default () => {
    const { width } = useWindowDimensions()

    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <View style={Style.imageWrapper}>
                <Image
                    source={require('../../assets/images/onlineMode.png')}
                    style={Style.banner}
                />
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 70,
        maxHeight: 70,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 40,
        maxHeight: 50,
        minWidth: 265,
        maxWidth: 265,
    },
    banner: {
        height: 60,
        width: 232,
    },
})
