import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/tool/tool'

type ConfirmNav = StackNavigationProp<RootStackParams, 'confirmation'>

export default () => {
    const navigation = useNavigation<ConfirmNav>()

    const handleClick = () => {
        navigation.navigate('room', { screen: 'main' })
    }

    return (
        <View style={Style.container}>
            <View style={Style.title}>
                <Text style={Style.titleText}>
                    Votre compte a bien été créé !
                </Text>
            </View>
            <View style={Style.imageContainer}>
                <Image
                    source={require('../assets/images/sendmail.png')}
                    style={Style.image}
                />
            </View>
            <View style={Style.para1}>
                <Text>Vous allez recevoir un </Text>
                <Text style={{ ...Style.titleText, fontSize: 13 }}>
                    email de confirmation{' '}
                </Text>
                <Text>sur l’adresse mail que vous avez communiqué.</Text>
            </View>
            <View style={Style.para2}>
                <Text>
                    Veuillez cliquer sur le lien du mail afin de valider votre
                    compte, et d’accéder à l’application.
                </Text>
            </View>
            <View style={Style.buttonContainer}>
                <TouchableOpacity style={Style.button} onPress={handleClick}>
                    <Text style={Style.buttonText}>SUIVANT</Text>
                    <Icon
                        name="arrow-forward-outline"
                        height={20}
                        width={20}
                        fill="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-end',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
    },
    titleText: {
        color: '#1B2444',
        fontWeight: 'bold',
        fontSize: 17,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 250,
        maxHeight: 250,
    },
    image: {
        height: 200,
        width: 200,
    },
    para1: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 100,
        maxHeight: 100,
    },
    para2: {
        flex: 1,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 100,
        maxHeight: 100,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 100,
        maxHeight: 100,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1B2444',
        borderRadius: 10,
        minWidth: 150,
        maxWidth: 150,
        minHeight: 60,
        maxHeight: 60,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})
