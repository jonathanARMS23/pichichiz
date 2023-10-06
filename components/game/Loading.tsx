import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    ActivityIndicator,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'

export default () => {
    const { width, height } = useWindowDimensions()

    return (
        <View
            style={{
                ...Style.wrapper,
                minWidth: width,
                minHeight: height,
                maxWidth: width,
                maxHeight: height,
            }}
        >
            <ImageBackground
                source={require('../../assets/images/loadingBackground.png')}
                style={Style.imageBackground}
            >
                <Image
                    source={require('../../assets/images/launchLogo2.png')}
                    style={Style.logo}
                />
                <View style={Style.message}>
                    <Text style={Style.text}>GET READY</Text>
                    <ActivityIndicator size="small" color="#1B2444" />
                </View>
            </ImageBackground>
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    logo: {
        height: 76.15,
        width: 276.25,
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 94,
        maxHeight: 94,
        minWidth: 276.25,
        maxWidth: 276.25,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#323D65',
    },
})
