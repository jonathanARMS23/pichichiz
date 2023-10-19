import React, { useState, useEffect } from 'react'
import {
    View,
    ImageBackground,
    Image,
    // ScrollView,
    // FlatList,
    Text,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import {
    extractQuestionData,
    extractFormation,
} from '../../../services/factory/Game'
import { verify } from '../../../services/factory/factory'

interface IProps {
    data: any
}

interface IPProps {
    data: any
}

const Player = ({ data }: IPProps) => {
    if (data === null) return <View style={Style.item}></View>

    /** if (data && !verify(data.show))
        return (
            <View style={Style.item}>
                <Image
                    source={require('../../../assets/images/question.png')}
                    style={Style.question}
                />
            </View>
        ) */

    if (data && !verify(data.show))
        return (
            <View style={Style.item}>
                <Image
                    source={{
                        uri: `${data.country_flag}`,
                    }}
                    style={Style.flag}
                />
            </View>
        )

    return (
        <View style={Style.item}>
            <Text style={Style.playerName}>{`${data.last_name}`}</Text>
        </View>
    )
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) {
            const format = extractFormation(extract)
            setInfo(format)
        }
    }, [])

    if (!info) return null

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <ImageBackground
                source={require('../../../assets/images/pitch.png')}
                style={Style.pitch}
            >
                {/* <FlatList
                        data={info}
                        keyExtractor={(item, index) => `player${index}`}
                        renderItem={({ item }) => <Player data={item} />}
                        numColumns={5}
                    /> */}
                {info.map((el: any, index: number) => (
                    <Player key={`player${index}`} data={el} />
                ))}
            </ImageBackground>
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 310,
        maxHeight: 310,
    },
    pitch: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minWidth: 352,
        maxWidth: 352,
        minHeight: 249,
        maxHeight: 249,
        flexWrap: 'wrap',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70.4,
        maxWidth: 70.4,
        minHeight: 35.57,
        maxHeight: 35.57,
    },
    /** question: {
        height: 35.57,
        width: 34.24,
    }, */
    playerName: {
        fontSize: 10,
        textAlign: 'justify',
    },
    flag: {
        width: 35,
        height: 23.33,
    },
})
