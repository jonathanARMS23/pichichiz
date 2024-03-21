/* eslint-disable no-lonely-if */
import React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
// import { useSelector } from 'react-redux'
import { Icon } from 'react-native-eva-icons'
/* import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool' */
import Statut from '../sous-components/Statut'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams, RootStackParams } from '../../navigation/tool/tool'
import { useNavigation } from '@react-navigation/native'

interface IIProps {
    data: any
}

interface IProps {
    data: Array<any>
}

type LigueNavProp = StackNavigationProp<RootStackParams, 'confirmrejoindre'>

const Item = ({ data }: IIProps) => {
    // const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<LigueNavProp>()

    const onRejoindre = () => {
        navigation.navigate('confirmrejoindre', {
            data: data,
        })
    }

    const onFight = async () => {
        console.log('supprimer invitation')
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={false} />
                <Text>{`  ${data.name}`}</Text>
            </View>
            <View style={Style.playerAction}>
                <TouchableOpacity
                    onPress={onRejoindre}
                    style={{
                        ...Style.playerActionButton,
                        minWidth: 140,
                        maxWidth: 140,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    <Text style={Style.buttonFight}>{` REJOINDRE `}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onFight}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 40,
                        maxWidth: 40,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    <Icon
                        name="close-outline"
                        height={35}
                        width={35}
                        fill="#CC317C"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ({ data }: IProps) => {
    if (!data) return null

    if (data.length === 0)
        return (
            <View style={Style.container}>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>
                        INVITATIONS À REJOINDRE UNE LIGUE:
                    </Text>
                </View>
                <View style={Style.listContainer}>
                    <Icon
                        name="list-outline"
                        height={50}
                        width={50}
                        fill="#EBECF0"
                    />
                    <Text>Tu n'a reçu aucune invitation.</Text>
                </View>
            </View>
        )

    return (
        <View style={Style.container}>
            <View style={Style.titleContainer}>
                <Text style={Style.title}>
                    INVITATIONS À REJOINDRE UNE LIGUE:
                </Text>
            </View>
            <View style={Style.duelListContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => `duel${index}`}
                        renderItem={({ item }) => <Item data={item} />}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 100,
        maxHeight: 250,
        overflow: 'scroll',
    },
    duelListContainer: {
        flex: 1,
        minHeight: 100,
        maxHeight: 250,
        overflow: 'scroll',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
    },
    title: {
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 30,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#31CCC0',
    },
    buttonFight: {
        fontSize: 11,
        color: '#FFFFFF',
    },
})
