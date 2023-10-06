import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) {
            const infoData = extract[0]
            setInfo(infoData)
        }
    }, [])

    if (!info) return null

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <Image
                source={{
                    uri: `https://footballdatabase.eu/${info.logo_comp}`,
                }}
                style={Style.logo}
            />
            <View style={Style.info}>
                <Text style={Style.text}>{`${info.text}`}</Text>
                <Text style={Style.text}>{`${info.date}`}</Text>
            </View>
            <View style={Style.match}>
                <View
                    style={{ ...Style.section, minWidth: 144, maxWidth: 144 }}
                >
                    <Image
                        source={require('../../../assets/images/question.png')}
                        style={Style.icon}
                    />
                </View>
                <View style={{ ...Style.section, minWidth: 50, maxWidth: 50 }}>
                    <Text style={Style.score}>{`${info.resultat}`}</Text>
                </View>
                <View
                    style={{ ...Style.section, minWidth: 144, maxWidth: 144 }}
                >
                    <Text
                        style={{
                            ...Style.club,
                            minWidth: 144,
                            maxWidth: 144,
                            minHeight: 60,
                            maxHeight: 60,
                        }}
                    >{`${info.vs}`}</Text>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 310,
        maxHeight: 310,
    },
    logo: {
        minHeight: 109,
        maxHeight: 109,
        minWidth: 110,
        maxWidth: 110,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    match: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 62,
        maxHeight: 62,
        minWidth: 339,
        maxWidth: 339,
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 10,
    },
    club: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    score: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    icon: {
        height: 43.21,
        width: 41.6,
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        maxHeight: 60,
    },
})
