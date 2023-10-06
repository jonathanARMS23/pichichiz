import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { ShareProfil } from '../../services/factory/User'

interface IData {
    pseudo: string
    code: string
}

export default () => {
    const [data, setData] = useState<IData | null>(null)
    const { height } = useWindowDimensions()

    useEffect(() => {
        const extract = ShareProfil()
        console.log(extract)
        setData(extract)
    }, [])

    if (!data) return null

    return (
        <View style={{ ...Style.container, minHeight: height - 165 }}>
            <View style={Style.header}>
                <Text style={Style.title}>
                    Partage ton QR CODE à tes amis !
                </Text>
            </View>
            <View style={Style.body}>
                <View style={Style.wrapper}>
                    <View style={Style.QRContainer}>
                        <View style={Style.QRCode}>
                            <QRCode
                                value={data.code}
                                size={200}
                                backgroundColor="#EBECF0"
                            />
                            <Image
                                source={require('../../assets/images/cadre.png')}
                                style={Style.cadre}
                            />
                        </View>
                        <Text>{data.pseudo}</Text>
                    </View>
                    <View style={Style.share}>
                        <Text>Ou partage ce code à rentrer manuellement :</Text>
                        <Text style={Style.code}>{data.code}</Text>
                    </View>
                </View>
            </View>
            <View style={Style.shares}>
                <TouchableOpacity style={Style.button}>
                    <Image
                        source={require('../../assets/images/facebook_quiz.png')}
                        style={Style.icons}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Style.button}>
                    <Image
                        source={require('../../assets/images/twitter.png')}
                        style={Style.icons}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Style.button}>
                    <Image
                        source={require('../../assets/images/instagram.png')}
                        style={Style.icons}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Style.button}>
                    <Image
                        source={require('../../assets/images/whatsapp.png')}
                        style={Style.icons}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Style.button}>
                    <Image
                        source={require('../../assets/images/pinterest.png')}
                        style={Style.icons}
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
        justifyContent: 'space-between',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 350,
        maxWidth: 350,
    },
    title: {
        color: '#1B2444',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 400,
        borderRadius: 10,
        paddingVertical: 10,
        backgroundColor: '#EBECF0',
    },
    QRContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        maxHeight: 300,
    },
    QRCode: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 300,
        maxHeight: 300,
        position: 'relative',
    },
    cadre: {
        minWidth: 275,
        maxWidth: 275,
        minHeight: 275,
        maxHeight: 275,
        position: 'absolute',
    },
    share: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
    },
    code: {
        color: '#1B2444',
        fontWeight: 'bold',
    },
    shares: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 75,
        maxHeight: 100,
        minWidth: 375,
        maxWidth: 375,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 75,
        maxWidth: 75,
    },
    icons: {
        height: 50,
        width: 50,
    },
})
