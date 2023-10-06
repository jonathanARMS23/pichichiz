import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    TextInput,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useSelector } from 'react-redux'
import FriendAPI from '../../services/store/friends'
import socket from '../../services/socket/socket'

interface IIProps {
    data: any
}

const Item = ({ data }: IIProps) => {
    const User = useSelector((state: any) => state.user)
    const [selected, setSelected] = useState(false)

    const onSelect = async () => {
        /** socket.emit('friend_request', {
            auth: {
                token: `${token}`,
            },
            data: {
                user_id: parseInt(`${User.id}`, 10),
                friend_id: data.user_id,
            },
        }) */
        if (User.id && data.user_id) {
            const API = new FriendAPI()
            const dataBody = {
                user_id: User.id,
                friend_id: data.user_id,
            }
            const response = await API.sendFriendRequest(dataBody)
            if (!response.canceled) {
                setSelected(true)
                socket.emit('friend_request', {
                    data: {
                        user_id: parseInt(`${User.id}`, 10),
                        friend_id: data.user_id,
                    },
                })
            }
        }
    }

    return (
        <View style={Style.item}>
            <Text>{data.pseudo}</Text>
            <TouchableOpacity onPress={onSelect} style={Style.addButton}>
                {selected ? (
                    <Icon
                        name="checkmark-square-outline"
                        height={20}
                        width={20}
                        fill="#1B2444"
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/add2.png')}
                        style={Style.addIcon}
                    />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default () => {
    const { height } = useWindowDimensions()
    const [search, setSearch] = useState('')
    const [list, setList] = useState<Array<any>>([])

    useEffect(() => {
        const API = new FriendAPI()
        ;(async () => {
            if (search !== '') {
                const response = await API.getUserByPseudo(search)
                if (!response.canceled) {
                    console.log(response)
                    setList(response)
                }
            } else setList([])
        })()

        return () => {
            API.Cancel()
        }
    }, [search])

    return (
        <View
            style={{
                ...Style.container,
                minHeight: search === '' ? 80 : height / 2,
                maxHeight: search === '' ? 80 : height / 2,
            }}
        >
            <View style={Style.label}>
                <Text>
                    {search === ''
                        ? `Ajouter un ami à l'aide de son `
                        : `Rechercher votre ami à l'aide de son `}
                </Text>
                <Text style={Style.span}>pseudo</Text>
            </View>
            <View style={Style.inputContainer}>
                <View style={Style.input}>
                    <TextInput
                        onChangeText={setSearch}
                        value={search}
                        placeholder="john"
                        style={Style.inputText}
                    />
                    <View style={Style.search}>
                        <Icon
                            name="search-outline"
                            height={20}
                            width={20}
                            fill="#1B2444"
                        />
                    </View>
                </View>
            </View>
            <View style={Style.listContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => `result${index}`}
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
        justifyContent: 'flex-start',
        minWidth: 375,
        maxWidth: 375,
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 30,
        maxHeight: 30,
        minWidth: 375,
        maxWidth: 375,
    },
    span: {
        color: '#CC317C',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBECF0',
        borderRadius: 10,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    inputText: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 300,
        maxWidth: 300,
        borderWidth: 0,
    },
    search: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
    },
    addIcon: {
        height: 13,
        width: 20,
    },
    addButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
    },
})
