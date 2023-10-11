import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    FlatList,
    Text,
    Image,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

interface IIProps {
    data: any
}

const Item = ({ data }: IIProps) => (
    <View style={Style.item}>
        <Image source={{ uri: `${data.photos}` }} style={Style.photo} />
        <View style={Style.nameBlock}>
            <Text
                style={Style.text}
            >{`${data.first_name} ${data.last_name}`}</Text>
            <View style={Style.info}>
                <Image
                    source={{
                        uri: `${data.country_flag}`,
                    }}
                    style={Style.flag}
                />
                <Text style={Style.text}>{`  ${data.age} ans`}</Text>
            </View>
        </View>
        {/* <Text>{`${}`}</Text> */}
    </View>
)

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [list, setList] = useState<Array<any> | null>(null)

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) setList(extract)
    }, [])

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <View style={Style.listContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => `player${index}`}
                        numColumns={3}
                        renderItem={({ item }) => <Item data={item} />}
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
        minHeight: 290,
        maxHeight: 290,
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 290,
        maxHeight: 290,
        minWidth: 359,
        maxWidth: 359,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        paddingVertical: 5,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 142,
        maxHeight: 142,
        minWidth: 97,
        maxWidth: 97,
    },
    photo: {
        width: 63,
        height: 93,
    },
    flag: {
        height: 10,
        width: 15,
    },
    nameBlock: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 97,
        maxWidth: 97,
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 12,
        minHeight: 12,
    },
    text: {
        fontSize: 9,
    },
})
