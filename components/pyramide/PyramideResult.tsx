import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    ImageBackground,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    data: {
        me?: boolean
        nom: string
        score: number
    }
    index: number
    winned?: boolean
}

const data = [
    {
        nom: 'Adixon',
        score: 38,
    },
    {
        nom: 'bammyHall',
        score: 31,
    },
    {
        nom: 'Laulau4',
        score: 46,
        me: true,
    },
    {
        nom: 'didiboot',
        score: 24,
    },
]

const Item = ({ data, index, winned }: IProps) => {
    return (
        <View
            style={{
                ...Style.item,
                backgroundColor: data.me
                    ? winned
                        ? COLORS.green
                        : COLORS.red
                    : '',
            }}
        >
            <View style={Style.contentContainer}>
                <View style={Style.itemContent}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: data.me
                                ? winned
                                    ? COLORS.primary
                                    : '#ffffff'
                                : '#ffffff',
                        }}
                    >
                        {`${index}.`}
                    </Text>
                    <Text
                        style={{
                            marginLeft: 20,
                            color: data.me
                                ? winned
                                    ? COLORS.primary
                                    : '#ffffff'
                                : '#ffffff',
                        }}
                    >
                        {`${data.nom} ${data.me ? '(moi)' : ''}`}
                    </Text>
                </View>
                <Text
                    style={{
                        ...Style.itemContent,
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'right',
                        color: data.me
                            ? winned
                                ? COLORS.primary
                                : '#ffffff'
                            : '#ffffff',
                    }}
                >
                    {data.score}
                </Text>
            </View>
        </View>
    )
}
export default () => {
    const winned = true
    const { width } = useWindowDimensions()
    const dataSort = data.sort(function (a, b) {
        return b.score - a.score
    })
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
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}
                    >
                        PYRAMIDE
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 17,
                        color: COLORS.light_primary,
                        letterSpacing: 1.2,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    RÉSULTATS
                </Text>
                <ImageBackground
                    source={
                        winned
                            ? require('../../assets/images/victory.png')
                            : require('../../assets/images/defeat.png')
                    }
                    style={winned ? Style.motifWinned : Style.motifLosed}
                >
                    <ImageBackground
                        source={require('../../assets/images/victoryElipse.png')}
                        style={Style.elipse}
                    >
                        {winned ? (
                            <Image
                                source={require('../../assets/images/winned.png')}
                                style={{
                                    height: 121.55,
                                    width: 83.56,
                                    marginTop: 45,
                                }}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/losed.png')}
                                style={{ height: 119, width: 119 }}
                            />
                        )}
                    </ImageBackground>
                </ImageBackground>
                <View style={Style.messageContainer}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: winned ? COLORS.green : COLORS.red,
                            fontWeight: 'bold',
                        }}
                    >
                        {`${winned ? 'FÉLICITATIONS !!' : 'BIEN JOUÉ'}`}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#ffffff' }}>
                        {`${
                            winned
                                ? 'TU AS REMPORTÉ LA PYRAMIDE '
                                : "MAIS CE N'EST PAS SUFFISANT POUR CETTE FOIS"
                        }`}
                    </Text>
                    <Text style={{ color: '#ffffff' }}>
                        {`${
                            winned
                                ? ' Tu as fait le meilleur score contre tes amis ! !!'
                                : "Tu n'as pas fait le meilleur score ..."
                        }`}
                    </Text>
                </View>

                <View style={Style.listContainer}>
                    <Text style={Style.textPts}>PTS</Text>

                    <FlatList
                        style={{ width: 375 }}
                        data={dataSort}
                        keyExtractor={(item, index) => `duel${index}`}
                        renderItem={({ item, index }) => (
                            <Item
                                data={item}
                                index={index + 1}
                                winned={winned}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={{ ...Style.bottom, width: width }}>
                <Text style={Style.exitText}>QUITTER</Text>
                <TouchableOpacity style={Style.exitButton}>
                    <Icon
                        name="close-outline"
                        height={20}
                        width={20}
                        fill={'#ffffff'}
                    />
                </TouchableOpacity>
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
        minHeight: '80%',
        maxHeight: '80%',
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
    },
    banner: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    motifWinned: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 124,
        maxHeight: 124,
        minWidth: 245.13,
        maxWidth: 245.13,
    },
    motifLosed: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 135,
        maxHeight: 135,
        minWidth: 375,
        maxWidth: 375,
    },
    elipse: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 110,
        maxHeight: 110,
        minWidth: 110,
        maxWidth: 110,
    },
    messageContainer: {
        flex: 1,
        marginTop: 40,
        minHeight: 90,
        maxHeight: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    listContainer: {
        flex: 1,
    },

    textPts: {
        marginTop: 5,
        minWidth: '99%',
        maxWidth: '99%',
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'right',
        fontWeight: 'bold',
        paddingRight: 12,
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
        borderBottomColor: '#ffffff',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.light_primary,
    },
    exitText: {
        fontSize: 19,
        color: '#ffffff',
        marginBottom: 25,
        fontWeight: '400',
    },
    exitButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: COLORS.light_primary,
    },
})
