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
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import { reformatFriendsList } from '../../services/factory/Friends'
// import { CreateDuel } from '../../store/reducers/duel'
import FriendAPI from '../../services/store/friends'
// import DuelStore from '../../services/store/Duel'
// import SerieStore, { Type } from '../../services/store/Serie'
import Statut from '../sous-components/Statut'

type ListNavProp = StackNavigationProp<RootStackParams, 'room'>

interface IIProps {
    data: any
    onReload: any
}

interface IHProps {
    title: string
}

const Item = ({ data, onReload }: IIProps) => {
    // const Dispatch = useDispatch()
    // const navigation = useNavigation<ListNavProp>()
    const User = useSelector((state: any) => state.user)

    const onRemove = async () => {
        const API = new FriendAPI()
        const response = await API.deleteFriend(User.id, data.user_id)
        if (response) onReload()
    }

    /* const onFight = async () => {
        console.log(`challenge ${data.user_id}`)
    } */
    /** const onFight = async () => {
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
                }
                navigation.navigate('duelgame', {
                    id_duel: D_response.id_duel,
                    id_serie: S_response.id_serie,
                })
            }
        }
        // navigation.navigate('duelgame', { vs: data.pseudo })
    } */

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={data.actif} />
                <Text>{`  ${data.pseudo}`}</Text>
            </View>
            <View style={Style.playerAction}>
                {/** <TouchableOpacity
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
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={onRemove}
                    style={{
                        ...Style.playerActionButton,
                        minWidth: 40,
                        maxWidth: 40,
                        minHeight: 40,
                        maxHeight: 40,
                    }}
                >
                    <Image
                        source={require('../../assets/images/remove.png')}
                        style={Style.icon}
                    />
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

export default () => {
    const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<ListNavProp>()
    const [search, setSearch] = useState('')
    const [list, setList] = useState<Array<any>>([])
    const [data, setData] = useState<Array<any>>([])
    const [dataBrute, setDataBrute] = useState<Array<any>>([])
    const [reload, setReload] = useState(true)
    const [load, setLoad] = useState(true)
    const { height } = useWindowDimensions()

    useEffect(() => {
        const API = new FriendAPI()
        ;(async () => {
            if (reload && User.id) {
                const response = await API.getUserFriends(User.id)
                if (!response.canceled && Array.isArray(response)) {
                    setDataBrute(response)
                    const extract = reformatFriendsList(response)
                    setData(extract)
                }
                setLoad(false)
                console.log('is loaded')
                setReload(false)
            }
        })()

        return () => {
            API.Cancel()
        }
    }, [reload])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setList(data)
        }
    }, [data])

    useEffect(() => {
        if (search !== '' && Array.isArray(data) && data.length > 0) {
            const filtered = dataBrute.filter(
                (el: any) => el.pseudo.indexOf(search) !== -1
            )
            const extract = reformatFriendsList(filtered)

            setList(extract)
        } else setList(data)
    }, [search])

    const onReload = () => {
        setReload(true)
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 500)
    }

    const goToAddFriend = () => {
        navigation.navigate('room', {
            screen: 'friends',
            params: { screen: 'add' },
        })
    }

    if (load)
        return (
            <View
                style={{
                    ...Style.container,
                    minHeight: (height * 75) / 100,
                    maxHeight: (height * 75) / 100,
                }}
            >
                <View
                    style={{
                        ...Style.listContainer,
                        minHeight: (height * 70) / 100,
                        maxHeight: (height * 70) / 100,
                    }}
                >
                    <>
                        <ActivityIndicator size="small" color="#1B2444" />
                        <Text>Un instant...</Text>
                    </>
                </View>
                <View
                    style={{
                        ...Style.footer,
                        marginTop: height - (height * 35) / 100,
                    }}
                >
                    <TouchableOpacity
                        style={{ ...Style.buttonAdd, ...Style.elevation }}
                        onPress={goToAddFriend}
                    >
                        <Image
                            source={require('../../assets/images/add.png')}
                            style={Style.icon}
                        />
                        <Text
                            style={Style.buttonAddText}
                        >{`  AJOUTER DES AMIS`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    return (
        <View
            style={{
                ...Style.container,
                minHeight: (height * 75) / 100,
                maxHeight: (height * 75) / 100,
            }}
        >
            {list.length > 0 ? (
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
            ) : (
                <View style={Style.inputContainer}></View>
            )}
            <View
                style={{
                    ...Style.listContainer,
                    minHeight: (height * 70) / 100,
                    maxHeight: (height * 70) / 100,
                }}
            >
                {list.length > 0 ? (
                    <ScrollView horizontal>
                        <SectionList
                            sections={list}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => (
                                <Item data={item} onReload={onReload} />
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <HeaderItem title={title} />
                            )}
                        />
                    </ScrollView>
                ) : (
                    <>
                        <Icon name="list-outline" height={50} width={50} />
                        <Text>Vous n'avez pas encore d'amis</Text>
                    </>
                )}
            </View>
            <View
                style={{
                    ...Style.footer,
                    marginTop: height - (height * 35) / 100,
                }}
            >
                <TouchableOpacity
                    style={{ ...Style.buttonAdd, ...Style.elevation }}
                    onPress={goToAddFriend}
                >
                    <Image
                        source={require('../../assets/images/add.png')}
                        style={Style.icon}
                    />
                    <Text
                        style={Style.buttonAddText}
                    >{`  AJOUTER DES AMIS`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    elevation: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
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
        justifyContent: 'flex-end',
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#000',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
        position: 'absolute',
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#1B2444',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    icon: {
        height: 20,
        width: 20,
    },
    /** buttonFight: {
        fontSize: 11,
    }, */
})
