import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    SectionList,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import { CreateDuel } from '../../store/reducers/duel'
import DuelStore from '../../services/store/Duel'
import SerieStore, { Type } from '../../services/store/Serie'
import Statut from '../sous-components/Statut'

interface IProps {
    data: Array<any>
}

interface IIProps {
    data: any
}

interface IHProps {
    title: string
}

type DuelNavProp = StackNavigationProp<RootStackParams, 'duel'>

const Item = ({ data }: IIProps) => {
    const navigation = useNavigation<DuelNavProp>()
    const User = useSelector((state: any) => state.user)
    const Dispatch = useDispatch()

    const onFight = async () => {
        if (User.id && data.user_id) {
            const API = new DuelStore()
            const SAPI = new SerieStore()
            const D_response = await API.CreateDuel(User.id, data.user_id)
            if (!D_response.canceled) {
                const S_response = await SAPI.CreateSerie(
                    D_response.id_duel,
                    Type.CLASSIC
                )
                if (!S_response.canceled) {
                    const player1 = D_response.user
                    const player2 = D_response.vs
                    Dispatch(
                        CreateDuel({
                            id_player1: player1.id,
                            pseudo_player1: player1.pseudo,
                            id_player2: player2.id,
                            pseudo_player2: player2.pseudo,
                            score_player1: 0,
                            score_player2: 0,
                            id_duel: D_response.id_duel,
                            id_serie: S_response.id_serie,
                        })
                    )
                    navigation.navigate('duelgame', {
                        id_duel: D_response.id_duel,
                        id_serie: S_response.id_serie,
                    })
                }
            }
        }
        // navigation.navigate('duelgame', { vs: data.pseudo })
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={data.actif} />
                <Text>{`  ${data.pseudo}`}</Text>
            </View>
            <View style={Style.playerAction}>
                <TouchableOpacity
                    onPress={onFight}
                    style={{
                        ...Style.playerActionButton,
                        borderWidth: 1,
                        minWidth: 150,
                        maxWidth: 150,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    <Image
                        source={require('../../assets/images/fight.png')}
                        style={Style.icon}
                    />
                    <Text
                        style={Style.buttonFight}
                    >{` PROVOQUER EN DUEL`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const HeaderItem = ({ title }: IHProps) => (
    <View style={Style.headerItem}>
        <Text style={Style.headerTitle}>{title}</Text>
    </View>
)

export default ({ data }: IProps) => {
    const [search, setSearch] = useState('')
    const [list, setList] = useState<Array<any>>([])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setList(data)
        }
    }, [data])

    useEffect(() => {
        if (search !== '') {
            const filtered = data.filter(
                (el: any) => el.pseudo.indexOf(search) !== -1
            )

            setList(filtered)
        } else setList(data)
    }, [search])

    if (list.length === 0)
        return (
            <View style={Style.container}>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>JE DÉFIE UN AMI!</Text>
                </View>
                <View style={Style.listContainer}>
                    <Icon
                        name="list-outline"
                        height={50}
                        width={50}
                        fill="#EBECF0"
                    />
                    <Text>Aucun ami à défier!</Text>
                </View>
            </View>
        )

    return (
        <View style={Style.container}>
            <View style={Style.titleContainer}>
                <Text style={Style.title}>JE DEFIE UN AMI!</Text>
            </View>
            <View style={Style.inputContainer}>
                <TextInput
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Rechercher un ami"
                    style={Style.input}
                />
                <TouchableOpacity style={Style.searchButton}>
                    <Icon
                        name="search-outline"
                        height={20}
                        width={20}
                        fill="#C3C3C3"
                    />
                </TouchableOpacity>
            </View>
            <View style={Style.listContainer}>
                <ScrollView horizontal>
                    <SectionList
                        sections={list}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item data={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <HeaderItem title={title} />
                        )}
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
        position: 'relative',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#1B2444',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        backgroundColor: '#EBECF0',
        borderRadius: 10,
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 335,
        maxWidth: 335,
        backgroundColor: '#EBECF0',
    },
    searchButton: {
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        minHeight: 150,
        maxHeight: 300,
        overflow: 'scroll',
    },
    headerItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#000',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#1B2444',
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
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#000',
    },
    icon: {
        height: 20,
        width: 20,
    },
    buttonFight: {
        fontSize: 11,
    },
})
