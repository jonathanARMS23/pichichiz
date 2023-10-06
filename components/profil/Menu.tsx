import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'

type MenuNavProp = StackNavigationProp<RootStackParams>

export default () => {
    // eslint-disable-next-line no-unused-vars
    const navigation = useNavigation<MenuNavProp>()

    return (
        <View style={Style.container}>
            <View style={Style.bloc}>
                <TouchableOpacity
                    style={{
                        ...Style.button1,
                        ...Style.disabled,
                        backgroundColor: '#1B2444',
                    }}
                >
                    <Text style={Style.textButton}>MES DUELS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...Style.button1,
                        ...Style.disabled,
                        borderColor: '#1B2444',
                        borderWidth: 1,
                    }}
                >
                    <Text>MES LIGUES</Text>
                </TouchableOpacity>
            </View>
            <View style={Style.bloc}>
                <TouchableOpacity
                    style={{ ...Style.button2, ...Style.disabled }}
                >
                    <Image
                        source={require('../../assets/images/reward3.png')}
                        style={Style.image}
                    />
                    <Text>MES RECOMPENSES</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: 350,
        maxWidth: 350,
        alignItems: 'center',
        marginVertical: 10,
    },
    bloc: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 350,
        maxWidth: 350,
    },
    button1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 162.5,
        maxWidth: 162.5,
        borderRadius: 5,
    },
    button2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 350,
        maxWidth: 350,
        borderRadius: 5,
        backgroundColor: '#EBECF0',
    },
    image: {
        height: 30,
        width: 30,
    },
    textButton: {
        color: '#FFFFFF',
    },
    disabled: {
        opacity: 0.5,
    },
})
