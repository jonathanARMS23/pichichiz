import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    SectionList,
} from 'react-native'
import { useSelector } from 'react-redux'
import CheckBox from '@react-native-community/checkbox'
import FriendAPI from '../../services/store/friends'
import LigueStore from '../../services/store/Ligue'
import { reformatFriendsList } from '../../services/factory/Friends'
import Statut from '../sous-components/Statut'

interface IProps {
    ligue_id: number
    setSteps: Function
}

interface IIProps {
    data: any
    onAddId: Function
    onRemoveId: Function
}

interface IHProps {
    title: string
}

const Item = ({ data, onAddId, onRemoveId }: IIProps) => {
    const [value, setValue] = useState(false)

    useEffect(() => {
        if (!value) onRemoveId(parseInt(`${data.user_id}`, 10))
        else onAddId(parseInt(`${data.user_id}`, 10))
    }, [value])

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={data.actif} />
                <Text>{`  ${data.pseudo}`}</Text>
            </View>
            <View style={Style.playerAction}>
                <CheckBox
                    value={value}
                    onValueChange={(newValue) => setValue(newValue)}
                />
            </View>
        </View>
    )
}

const HeaderItem = ({ title }: IHProps) => (
    <View style={Style.headerItem}>
        <Text style={Style.headerTitle}>{title}</Text>
    </View>
)

export default ({ setSteps, ligue_id }: IProps) => {
    const User = useSelector((state: any) => state.user)
    const [list, setList] = useState<Array<any>>([])
    const [sendList, setSendList] = useState<any[]>([])
    const [data, setData] = useState<Array<any>>([])
    const [reload, setReload] = useState(true)
    const { height } = useWindowDimensions()

    useEffect(() => {
        const API = new FriendAPI()
        ;(async () => {
            if (reload && User.id) {
                const response = await API.getUserFriends(User.id)
                if (!response.canceled && Array.isArray(response)) {
                    const extract = reformatFriendsList(response)
                    setData(extract)
                }
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
        console.log(sendList)
    }, [sendList])

    const onCreate = async () => {
        if (!User?.id || !ligue_id) return
        const API = new LigueStore()
        const body = {
            id_ligue: ligue_id,
            id_users: sendList.join(','),
        }
        const response = await API.CreateInvitations(body)
        if (response.canceled) return
        setSteps(3)
    }

    const onAddId = (id: number) => {
        const tmpList = [...sendList]
        tmpList.push(id)
        setSendList(tmpList)
    }

    const onRemoveId = (id: number) => {
        const tmpList = [...sendList]
        const filtered = tmpList.filter((el) => el !== id)
        setSendList(filtered)
    }

    return (
        <View style={Style.container}>
            <View style={{ ...Style.container, maxHeight: 100 }}>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>MEMBRES DE LA LIGUE</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        minWidth: 375,
                        maxWidth: 375,
                        minHeight: 75,
                        marginTop: 10,
                    }}
                >
                    <Text>
                        Ajoute tes amis que tu veux venir intégrer à cette
                        nouvelle ligue..
                    </Text>
                </View>
            </View>
            <View
                style={{
                    ...Style.container,
                    backgroundColor: 'aqua',
                }}
            >
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>AMIS CONNECTÉ</Text>
                </View>
                <View
                    style={{
                        ...Style.listContainer,
                    }}
                >
                    {list.length > 0 ? (
                        <ScrollView horizontal>
                            <SectionList
                                sections={list}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => (
                                    <Item
                                        data={item}
                                        onAddId={onAddId}
                                        onRemoveId={onRemoveId}
                                    />
                                )}
                                renderSectionHeader={({
                                    section: { title },
                                }) => <HeaderItem title={title} />}
                            />
                        </ScrollView>
                    ) : (
                        <>
                            <Text>Vous n'avez pas encore d'amis</Text>
                        </>
                    )}
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    minWidth: 375,
                    maxWidth: 375,
                    minHeight: 60,
                    maxHeight: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...Style.buttonAdd,
                        borderWidth: 1,
                        borderColor: '#1B2444',
                    }}
                    onPress={onCreate}
                >
                    <Text
                        style={{ ...Style.buttonAddText, color: '#1B2444' }}
                    >{`  ENVOYER LES INVITATIONS`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
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
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 219,
        maxWidth: 219,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
})
