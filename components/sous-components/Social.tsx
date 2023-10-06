import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'


interface IProps {
    authType: string
}

export default ({ authType }: IProps) => {

    if (authType === 'signup')
        return (
            <View style={Style.container}>
                <TouchableOpacity style={Style.button}>
                    <Image source={require('../../assets/images/google.png')} style={Style.image} />
                    <Text style={Style.text}>créer un compte avec Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.button}>
                    <Image source={require('../../assets/images/facebook.png')} style={Style.image} />
                    <Text style={Style.text}>créer un compte avec Facebook</Text>
                </TouchableOpacity>
            </View>
        )

    return (
        <View style={Style.container}>
            <TouchableOpacity style={Style.button}>
                <Image source={require('../../assets/images/google.png')} style={Style.image} />
                <Text style={Style.text}>se connecter avec Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.button}>
                <Image source={require('../../assets/images/facebook.png')} style={Style.image} />
                <Text style={Style.text}>se connecter avec Facebook</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 150,
        maxHeight: 150,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#EBECF0',
        minHeight: 60,
        maxHeight: 60,
        minWidth: 180,
        maxWidth: 180,
    },
    image: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    text: {
        maxWidth: 100,
        fontSize: 11,
    },
})