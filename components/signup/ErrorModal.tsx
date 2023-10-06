import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    nom: boolean
    prenom: boolean
    email: boolean
    tel: boolean
    onPress: any
}

export default ({ nom, prenom, email, tel, onPress }: IProps) => (
    <View style={Style.container}>
        <View style={Style.header}>
            <TouchableOpacity style={Style.button} onPress={onPress}>
                <Icon name="close" height={20} width={20} fill="#1B2444" />
            </TouchableOpacity>
        </View>
        <View style={Style.errorBloc}>
            <Text
                style={{
                    ...Style.text,
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    color: '#CC317C',
                }}
            >
                Erreur:{' '}
            </Text>
            {nom ? (
                <Text style={Style.text}>* Saisissez un nom valide</Text>
            ) : null}
            {prenom ? (
                <Text style={Style.text}>* Saisissez un prénom valide</Text>
            ) : null}
            {email ? (
                <Text style={Style.text}>* Saisissez un email valide</Text>
            ) : null}
            {tel ? (
                <Text style={Style.text}>* Saississez un numéro valide</Text>
            ) : null}
        </View>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minHeight: 100,
        maxHeight: 300,
        minWidth: 250,
        maxWidth: 250,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    header: {
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 250,
        maxWidth: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 30,
        maxHeight: 30,
        minWidth: 30,
        maxWidth: 30,
        borderRadius: 15,
        backgroundColor: '#EBECF0',
    },
    errorBloc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        maxHeight: 260,
        minWidth: 250,
        maxWidth: 250,
        paddingHorizontal: 2,
    },
    text: {
        minHeight: 60,
        maxHeight: 60,
        minWidth: 200,
        maxWidth: 200,
        fontSize: 15,
        fontWeight: 'bold',
    },
})
