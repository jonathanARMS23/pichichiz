import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface IProps {
    pseudo: string
}

export default ({ pseudo }: IProps) => (
    <View style={Style.container}>
        <View style={Style.imageContainer}>
            <Image
                source={require('../../assets/images/avatar2.png')}
                style={Style.image}
            />
        </View>
        <View style={Style.textContainer}>
            <Text style={Style.text1}>{`Hello, ${pseudo}`}</Text>
            <Text>On joue à quoi aujourd’hui ?</Text>
        </View>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 375,
        maxWidth: 375,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 75,
        maxWidth: 75,
        marginLeft: 15,
    },
    image: {
        height: 50,
        width: 50,
    },
    textContainer: {
        minHeight: 75,
        maxHeight: 75,
        minWidth: 275,
        maxWidth: 275,
        flex: 1,
        justifyContent: 'center',
    },
    text1: {
        fontWeight: 'bold',
    },
})
