import React from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'

interface IProps {
    name: string
}

export default ({ name }: IProps) => (
    <View style={Style.container}>
        <View style={Style.header}>
            <Image
                source={require(`../../assets/images/duel.png`)}
                style={Style.logo}
            />
            <Text style={Style.title}>DUEL</Text>
            <Text style={Style.vs}>{name ? `contre ${name}` : ''}</Text>
        </View>
        <Text style={Style.text}>
            Merci de patienter, le duel va se lancer dans quelques instants
        </Text>
        <View style={Style.loading}>
            <ActivityIndicator size="large" color="#323D65" />
            <Text style={Style.loadingText}>CHARGEMENT</Text>
        </View>
        <View></View>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1B2444',
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 130,
        maxHeight: 130,
    },
    vs: {
        fontSize: 17,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 15,
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    logo: {
        height: 60,
        width: 60,
    },
    loadingText: {
        color: '#323D65',
        fontSize: 19,
    },
    loading: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 130,
        maxHeight: 130,
    },
})
