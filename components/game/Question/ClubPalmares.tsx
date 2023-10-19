import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

interface IIProps {
    data: any
}

const Item = ({ data }: IIProps) => {
    const { text } = data
    const [text1, setText1] = useState<string | null>(null)
    const [text2, setText2] = useState<string | null>(null)
    const [loadedComp, setLoadedComp] = useState<boolean>(true)

    useEffect(() => {
        if (text && text !== '' && typeof text === 'string') {
            const explode = text.split(' ')
            if (explode.length > 1) {
                const season = explode[explode.length - 1]
                setText2(season)
                const filtered = explode.filter((el) => el !== season)
                const competition = filtered.join(' ')
                setText1(competition)
            } else setText1(text)
        }
    }, [text])

    return (
        <View style={Style.item}>
            {loadedComp ? (
                <Image
                    source={{
                        uri: `${data.logo_comp}`,
                    }}
                    style={Style.logo}
                    onError={() => setLoadedComp(false)}
                    onLoad={() => setLoadedComp(true)}
                />
            ) : (
                <Image
                    source={{
                        uri: `${data.country_flag}`,
                    }}
                    style={Style.logo}
                />
            )}
            <View style={Style.info}>
                {text1 ? <Text style={Style.text}>{`${text1}`}</Text> : null}
                {text2 ? <Text style={Style.season}>{`${text2}`}</Text> : null}
            </View>
        </View>
    )
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<Array<any> | null>(null)

    useEffect(() => {
        console.log(data)
        const extract = extractQuestionData(data)
        if (extract) setInfo(extract)
    }, [])

    if (!info) return null
    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <View style={Style.listContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={info}
                        keyExtractor={(item, index) => `trophy${index}`}
                        renderItem={({ item }) => <Item data={item} />}
                        numColumns={3}
                    />
                </ScrollView>
            </View>
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
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 310,
        maxHeight: 310,
        minWidth: 359,
        maxWidth: 359,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 100,
        maxWidth: 100,
        minHeight: 120,
        maxHeight: 120,
    },
    logo: {
        height: 62,
        width: 63,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 100,
        maxWidth: 100,
    },
    text: {
        maxWidth: 100,
        fontSize: 10,
        textAlign: 'justify',
        textTransform: 'none',
    },
    season: {
        minWidth: 100,
        maxWidth: 100,
        fontSize: 10,
        textAlign: 'center',
    },
})
