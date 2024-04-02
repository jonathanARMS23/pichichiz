import {
    View,
    Text,
    Platform,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../utiles/constantes'

export default () => {
    return (
        <View
            style={{
                ...Style.container,
                marginVertical: Platform.OS === 'ios' ? 20 : 0,
            }}
        >
            <View style={Style.content}>
                <View style={Style.banner}>
                    <Image
                        source={require('../../assets/images/pyramide.png')}
                        style={{ width: 70, height: 70 }}
                    />
                    <Text
                        style={{
                            color: '#ffffff',
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        PYRAMIDE
                    </Text>
                </View>
                <View style={Style.playerContainer}>
                    <Text style={{ color: COLORS.light_primary }}>
                        QUESTION !
                    </Text>
                    <Text style={Style.player}>Pour didiboot</Text>
                    <Text style={Style.ligne}></Text>
                </View>
                <View style={Style.loading}>
                    <ActivityIndicator size="large" color="#323D65" />
                    <Text style={Style.loadingText}>CHARGEMENT</Text>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingVertical: 5,
    },

    content: {
        flex: 1,
        minHeight: '70%',
        maxHeight: '70%',
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    banner: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerContainer: {
        minHeight: 80,
        maxHeight: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    player: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    ligne: {
        minWidth: 60,
        maxWidth: 60,
        borderTopWidth: 1,
        borderTopColor: '#ffffff',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        minHeight: 130,
        maxHeight: 130,
    },
    loadingText: {
        color: '#323D65',
        fontSize: 19,
        marginTop: 10,
    },
})
