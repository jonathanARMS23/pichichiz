import React, { useState } from 'react'
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useSelector } from 'react-redux'
import FriendAPI from '../../services/store/friends'
import socket from '../../services/socket/socket'

export default () => {
    const User = useSelector((state: any) => state.user)
    const [search, setSearch] = useState('')

    const onSend = async () => {
        /** socket.emit('email_friend_request', {
            auth: {
                toke: `${token}`,
            },
            data: {
                user_id: parseInt(`${User.id}`, 10),
                email: search,
            },
        }) */
        if (User.id && search !== '') {
            const API = new FriendAPI()
            const data = {
                user_id: User.id,
                email: search,
            }
            const response = await API.sendFriendRequestEmail(data)
            if (!response.canceled) {
                socket.emit('email_friend_request', {
                    data: {
                        user_id: parseInt(`${User.id}`, 10),
                        email: search,
                    },
                })
            }
        }
    }

    return (
        <View style={Style.container}>
            <View style={Style.label}>
                <Text>{'Ajouter un ami avec son '}</Text>
                <Text style={Style.span}>adresse mail:</Text>
            </View>
            <View style={Style.inputContainer}>
                <View style={Style.input}>
                    <TextInput
                        onChangeText={setSearch}
                        value={search}
                        placeholder="john@example.com"
                        style={Style.inputText}
                    />
                    <TouchableOpacity onPress={onSend} style={Style.search}>
                        <Icon
                            name="paper-plane-outline"
                            height={20}
                            width={20}
                            fill="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 80,
        maxHeight: 80,
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 375,
        maxWidth: 375,
    },
    span: {
        color: '#CC317C',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    search: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 75,
        maxWidth: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#1B2444',
    },
})
