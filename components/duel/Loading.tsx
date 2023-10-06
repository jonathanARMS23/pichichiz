import React from 'react'
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
} from 'react-native'

export default () => (
    <View style={Style.container}>
        <ImageBackground
            source={require('../../assets/images/loadingBackground.png')}
            style={Style.imageBackground}
        >
            <View style={Style.header}>
                <Image
                    source={require(`../../assets/images/duel.png`)}
                    style={Style.logo}
                />
                <Text style={Style.title}>DUEL</Text>
                <Text style={Style.vs}>{`Défier les meilleurs`}</Text>
            </View>
            <Text style={Style.text}>Bienvenue dans la section duel.</Text>
            <View style={Style.loading}>
                <ActivityIndicator size="large" color="#323D65" />
                <Text style={Style.loadingText}>CHARGEMENT</Text>
            </View>
            <View></View>
        </ImageBackground>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#1B2444',
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 340,
        maxWidth: 340,
        minHeight: 800,
        maxHeight: 800,
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
        color: '#1B2444',
        fontWeight: 'bold',
    },
    text: {
        color: '#1B2444',
        textAlign: 'center',
        fontSize: 15,
    },
    title: {
        color: '#1B2444',
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
