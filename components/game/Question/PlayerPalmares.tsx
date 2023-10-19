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
    const [loadedComp, setLoadedComp] = useState<boolean>(true)

    return (
        <View style={Style.item}>
            {loadedComp ? (
                <Image
                    source={{
                        uri: `${data.competition_logo}`,
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
                    style={Style.flag}
                />
            )}
            <View style={Style.info}>
                <Text
                    style={Style.text}
                >{`${data.competition_season_name}`}</Text>
                <Text style={Style.season}>{`${data.season}`}</Text>
            </View>
        </View>
    )
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<Array<any> | null>(null)

    useEffect(() => {
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
        minHeight: 150,
        maxHeight: 150,
        marginVertical: 10,
    },
    info: {
        flex: 1,
        minWidth: 100,
        maxWidth: 100,
        minHeight: 88,
        maxHeight: 88,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        height: 62,
        width: 63,
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
    flag: {
        width: 63,
        height: 42,
    },
})
