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
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import Statut from '../sous-components/Statut'

interface IIProps {
    data: any
}

interface IProps {
    data: Array<any>
}

type LigueNavProp = StackNavigationProp<RootStackParams, 'ligue'>

const Item = ({ data }: IIProps) => {
    // const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<LigueNavProp>()

    const onFight = () => {
        console.log('dataLigue: ', data)
        navigation.navigate('liguedetails', { code: data.code })
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={false} />
                <Text>{`  ${data.name}`}</Text>
            </View>
            <View style={Style.playerAction}>
                <TouchableOpacity
                    onPress={onFight}
                    style={{
                        ...Style.playerActionButton,
                        minWidth: 100,
                        maxWidth: 100,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    <Text style={Style.buttonFight}>{` Voir `}</Text>
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
                    <Text style={Style.title}>MES LIGUES:</Text>
                </View>
                <View style={Style.listContainer}>
                    <Icon
                        name="list-outline"
                        height={50}
                        width={50}
                        fill="#EBECF0"
                    />
                    <Text>Tu n'appartiens à aucune ligue encore.</Text>
                </View>
            </View>
        )

    return (
        <View style={Style.container}>
            <View style={Style.titleContainer}>
                <Text style={Style.title}>MES LIGUES:</Text>
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
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#1B2444',
    },
    buttonFight: {
        fontSize: 11,
        color: '#FFFFFF',
    },
})
