import {
    View,
    Text,
    useWindowDimensions,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    data: {
        me?: boolean
        nom: string
        score: number
    }
    index: number
}

const data = [
    {
        nom: 'Brillant',
        score: 12,
    },
    {
        nom: 'ArnaudK',
        score: 10,
    },
    {
        nom: 'Laulau4',
        score: 5,
        me: true,
    },
    {
        nom: 'bammyHall',
        score: 9,
    },
    {
        nom: 'Jonathan',
        score: 10,
    },
]

const Item = ({ data, index }: IProps) => {
    return (
        <View
            style={
                index === 1
                    ? {
                          ...Style.item,
                          backgroundColor: data.me
                              ? COLORS.light_primary
                              : 'rgba(49, 204, 192, 0.3)',
                      }
                    : data.me
                    ? { ...Style.item, backgroundColor: COLORS.light_primary }
                    : { ...Style.item }
            }
        >
            <View style={Style.contentContainer}>
                <View style={Style.content}>
                    <Text
                        style={{
                            color: data.me ? '#ffffff' : COLORS.primary,
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginRight: 20,
                        }}
                    >
                        {index}.
                    </Text>
                    <Text
                        style={{
                            color: data.me ? '#ffffff' : COLORS.primary,
                        }}
                    >
                        {data.me ? `${data.nom} (moi)` : `${data.nom}`}
                    </Text>
                </View>

                <Text
                    style={{
                        ...Style.content,
                        color: data.me ? '#ffffff' : COLORS.primary,
                        textAlign: 'right',
                        fontSize: 17,
                        fontWeight: 'bold',
                    }}
                >
                    {data.score}
                </Text>
            </View>
        </View>
    )
}

export default () => {
    const dataSort = data.sort(function (a, b) {
        return b.score - a.score
    })

    return (
        <View style={{ ...Style.container, width: 375 }}>
            <View style={Style.titleContainer}>
                <Image
                    source={require('../../../assets/images/leaderboard.png')}
                    // style={{ width: 20, height: 20 }}
                />
                <Text style={Style.title}>CLASSEMENT</Text>
            </View>
            <FlatList
                style={{ width: 375 }}
                data={dataSort}
                keyExtractor={(item, index) => `duel${index}`}
                renderItem={({ item, index }) => (
                    <Item data={item} index={index + 1} />
                )}
            />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        minHeight: 60,
        maxHeight: 60,
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    title: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    item: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 13,
    },
    contentContainer: {
        width: '99%',
        minHeight: 50,
        maxHeight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
})
