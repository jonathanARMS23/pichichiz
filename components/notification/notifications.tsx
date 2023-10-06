/* eslint-disable react-native/no-raw-text */
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native'
import moment from 'moment'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/tool/tool'
import { useAppSelector } from '../../store/hooks/hooks'
import NotificationStore, { TYPE } from '../../services/store/notification'
import 'moment/locale/fr'

type notifNavProp = StackNavigationProp<RootStackParams, 'notification'>
type TSwitch = 'all' | 'game' | 'friend'

interface IProps {
    data: any
}

moment.locale('fr')

const Item = ({ data }: IProps) => {
    const navigation = useNavigation<notifNavProp>()
    const { width } = useWindowDimensions()
    const navigationList: Array<TYPE> = [
        'duel',
        'friend_request',
        'friend_response',
    ]

    const getImage = () => {
        switch (data.type as TYPE) {
            case 'duel':
                return require('../../assets/images/duel.png')
            case 'friend_request':
                return require('../../assets/images/addfriend.png')
            case 'friend_response':
                return require('../../assets/images/added.png')
            default:
                return require('../../assets/images/duel.png')
        }
    }

    const handleClick = () => {
        switch (data.type as TYPE) {
            case 'duel':
                navigation.navigate('duel')
                break
            case 'friend_request':
                navigation.navigate('room', {
                    screen: 'friends',
                    params: { screen: 'manage', params: { option: 2 } },
                })
                break
            case 'friend_response':
                navigation.navigate('room', {
                    screen: 'friends',
                    params: { screen: 'manage', params: { option: 1 } },
                })
                break
            default:
                break
        }
    }

    return (
        <View
            style={{
                ...Style.item,
                minWidth: width,
                maxWidth: width,
                backgroundColor: data.checked === 'NO' ? '#BDD3FF' : '#FFFFFF',
            }}
        >
            <View style={Style.imageContainer}>
                <Image source={getImage()} style={Style.image} />
            </View>
            <View style={Style.notif}>
                <View style={Style.headerNotif}>
                    <Text style={{ ...Style.text, fontWeight: 'bold' }}>
                        {data.titre}
                    </Text>
                    <Text style={Style.text}>
                        {moment(data.created_at).fromNow()}
                    </Text>
                </View>
                <View style={Style.description}>
                    <Text style={Style.text}>
                        <Text
                            style={{ ...Style.text, fontWeight: 'bold' }}
                        >{`${data.subject}`}</Text>
                        {` ${data.description}`}
                    </Text>
                </View>
                {navigationList.includes(data.type as TYPE) ? (
                    <View style={Style.footerNotif}>
                        <TouchableOpacity
                            style={Style.openButton}
                            onPress={handleClick}
                        >
                            <Text style={Style.openButtonText}>VOIR</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </View>
    )
}

export default () => {
    const user = useAppSelector((state) => state.user)
    const { width } = useWindowDimensions()
    const [list, setList] = useState<Array<any>>([])
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState<TSwitch>('all')
    const [all, setAll] = useState(0)
    const [game, setGame] = useState(0)
    const [friend, setFriend] = useState(0)

    useEffect(() => {
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed) await getNotificationCount()
        })()

        return () => {
            isSubscribed = false
        }
    }, [])

    useEffect(() => {
        const API = new NotificationStore()
        setLoad(false)
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed && user.id) {
                let response: any
                if (selected === 'all')
                    response = await API.GetAllNotifications(
                        parseInt(`${user.id}`, 10)
                    )
                if (selected === 'friend')
                    response = await API.GetFriendNotifications(
                        parseInt(`${user.id}`, 10)
                    )
                if (selected === 'game')
                    response = await API.GetGameNotifications(
                        parseInt(`${user.id}`, 10)
                    )

                if (!response.canceled && Array.isArray(response)) {
                    console.log(response)
                    setList(response)
                }
                setLoad(true)
            }
        })()

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [selected])

    useEffect(() => {
        const API = new NotificationStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed && user.id) {
                let response: any
                if (selected === 'all')
                    response = await API.updateAllNotifications(
                        parseInt(`${user.id}`, 10)
                    )
                if (selected === 'friend')
                    response = await API.updateFriendNotifications(
                        parseInt(`${user.id}`, 10)
                    )
                if (selected === 'game')
                    response = await API.updateGameNotifications(
                        parseInt(`${user.id}`, 10)
                    )

                if (!response.canceled) {
                    console.log(response)
                }
            }
        })()

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [selected])

    const getNotificationCount = async () => {
        if (user.id) {
            const API = new NotificationStore()
            const response = await API.GetCountNotifications(
                parseInt(`${user.id}`, 10)
            )
            if (!response.canceled) {
                console.log(response)
                setAll(parseInt(`${response.all}`, 10))
                setGame(parseInt(`${response.game}`, 10))
                setFriend(parseInt(`${response.friend}`, 10))
            }
        }
    }
    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <View
                style={{
                    ...Style.switchWrapper,
                    minWidth: width,
                    maxWidth: width,
                }}
            >
                <View style={Style.switch}>
                    <TouchableOpacity
                        style={{
                            ...Style.switchOption,
                            backgroundColor:
                                selected === 'all' ? '#FFFFFF' : '#1B2444',
                        }}
                        onPress={() => setSelected('all')}
                    >
                        <Text style={Style.switchOptionText}>{` Toutes `}</Text>
                        {all > 0 ? (
                            <View style={Style.badge}>
                                <Text style={Style.badgeText}>{all}</Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...Style.switchOption,
                            backgroundColor:
                                selected === 'game' ? '#FFFFFF' : '#1B2444',
                        }}
                        onPress={() => setSelected('game')}
                    >
                        <Text style={Style.switchOptionText}>{` Jeu `}</Text>
                        {game > 0 ? (
                            <View style={Style.badge}>
                                <Text style={Style.badgeText}>{game}</Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...Style.switchOption,
                            backgroundColor:
                                selected === 'friend' ? '#FFFFFF' : '#1B2444',
                        }}
                        onPress={() => setSelected('friend')}
                    >
                        <Text style={Style.switchOptionText}>{` Amis `}</Text>
                        {friend > 0 ? (
                            <View style={Style.badge}>
                                <Text style={Style.badgeText}>{friend}</Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>
                </View>
            </View>
            {load ? (
                <View
                    style={{
                        ...Style.listContainer,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => `notif-${index}`}
                        renderItem={({ item }) => <Item data={item} />}
                    />
                </View>
            ) : (
                <View
                    style={{
                        ...Style.container,
                        minHeight: 500,
                        maxHeight: 500,
                    }}
                >
                    <View
                        style={{
                            ...Style.listContainer,
                            minHeight: 500,
                            maxHeight: 500,
                        }}
                    >
                        <>
                            <ActivityIndicator size="small" color="#1B2444" />
                            <Text>Un instant...</Text>
                        </>
                    </View>
                </View>
            )}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    switchWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        marginVertical: 20,
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 370,
        maxWidth: 370,
        paddingHorizontal: 10,
        minHeight: 50,
        maxHeight: 50,
        backgroundColor: '#1B2444',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    switchOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        minWidth: 110,
        maxWidth: 110,
        minHeight: 40,
        maxHeight: 40,
        backgroundColor: '#FFFFFF',
    },
    switchOptionText: {
        color: '#323D65',
    },
    badge: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B2444',
        minHeight: 20,
        maxHeight: 20,
        minWidth: 20,
        maxWidth: 20,
        borderRadius: 10,
    },
    badgeText: {
        color: '#FFFFFF',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        minHeight: 100,
        maxHeight: 120,
        borderBottomWidth: 3,
        borderColor: '#1B2444',
        marginTop: 10,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70,
        maxHeight: 90,
        minWidth: 55,
        maxWidth: 55,
    },
    image: {
        height: 45,
        width: 45,
    },
    notif: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minWidth: 291,
        maxWidth: 291,
        minHeight: 70,
        maxHeight: 90,
    },
    headerNotif: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 291,
        maxWidth: 291,
        minHeight: 20,
        maxHeight: 20,
    },
    description: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minWidth: 291,
        maxWidth: 291,
        minHeight: 50,
        maxHeight: 50,
    },
    footerNotif: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minWidth: 291,
        maxWidth: 291,
        minHeight: 22,
        maxHeight: 22,
    },
    openButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B2444',
        borderRadius: 5,
        minWidth: 46,
        maxWidth: 46,
        minHeight: 22,
        maxHeight: 22,
    },
    openButtonText: {
        fontSize: 9,
        color: '#FFFFFF',
    },
    text: {
        color: '#1B2444',
    },
})
