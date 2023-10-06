import React, { useState, useEffect } from 'react'
import {
    View,
    SectionList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { FriendStackParams } from '../../navigation/tool/tool'
import FriendAPI from '../../services/store/friends'
import socket from '../../services/socket/socket'

type RequestNavProp = StackNavigationProp<FriendStackParams, 'manage'>

moment.locale('fr')

interface IHProps {
    title: string
}

interface IIProps {
    data: any
    onReload: any
}

interface ISProps {
    data: any
    onReload: any
}

interface IRProps {
    data: any
    onReload: any
}

const NoData = () => {
    const { width, height } = useWindowDimensions()

    return (
        <View
            style={{
                flex: 1,
                minWidth: width - 20,
                maxWidth: width - 20,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: height / 4,
                maxHeight: height / 4,
            }}
        >
            <Icon name="list-outline" height={50} width={50} />
            <Text>Aucune requête d'amis</Text>
        </View>
    )
}

const Sended = ({ data, onReload }: ISProps) => {
    const User = useSelector((state: any) => state.user)

    const onCancel = async () => {
        const API = new FriendAPI()
        const response = await API.deleteInvitation(User.id, data.user_id)
        if (response) onReload()
    }

    return (
        <View style={{ ...Style.item, justifyContent: 'flex-start' }}>
            <View style={{ ...Style.player, minWidth: 100, maxWidth: 100 }}>
                <Text style={{ minWidth: 100, maxWidth: 100 }}>
                    {data.pseudo}
                </Text>
            </View>
            <View
                style={{ ...Style.playerAction, minWidth: 275, maxWidth: 275 }}
            >
                <TouchableOpacity
                    onPress={onCancel}
                    style={{
                        ...Style.playerActionButton,
                        backgroundColor: '#EBECF0',
                        minHeight: 40,
                        maxHeight: 40,
                        minWidth: 190,
                        maxWidth: 190,
                    }}
                >
                    <Icon
                        name="close-outline"
                        height={20}
                        width={20}
                        fill="#000"
                    />
                    <Text
                        style={Style.buttonText}
                    >{`  Annuler ma demande`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Received = ({ data, onReload }: IRProps) => {
    const User = useSelector((state: any) => state.user)

    const onConfirme = async () => {
        const API = new FriendAPI()
        const response = await API.confirmInvitation(data.user_id, User.id)
        if (response) onReload()
    }

    const onRemove = async () => {
        const API = new FriendAPI()
        const response = await API.deleteInvitation(data.user_id, User.id)
        if (response) onReload()
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Text>{data.pseudo}</Text>
            </View>
            <View style={Style.playerAction}>
                <TouchableOpacity
                    onPress={onConfirme}
                    style={{
                        ...Style.playerActionButton,
                        minHeight: 40,
                        maxHeight: 40,
                        minWidth: 150,
                        maxWidth: 150,
                        backgroundColor: '#31CCC0',
                    }}
                >
                    <Image
                        source={require('../../assets/images/add2.png')}
                        style={{
                            height: 13,
                            width: 20,
                        }}
                    />
                    <Text style={Style.buttonText}>{`  ACCEPTER`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onRemove}
                    style={{
                        ...Style.playerActionButton,
                        minHeight: 50,
                        maxHeight: 50,
                        minWidth: 40,
                        maxWidth: 40,
                    }}
                >
                    <Icon
                        name="close-outline"
                        height={20}
                        width={20}
                        fill="#CC317C"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Item = ({ data, onReload }: IIProps) => {
    if (data.noData) return <NoData />
    if (data.send) return <Sended data={data} onReload={onReload} />
    return <Received data={data} onReload={onReload} />
}

const HeaderItem = ({ title }: IHProps) => {
    const { width } = useWindowDimensions()
    return (
        <View
            style={{
                ...Style.headerItem,
                minWidth: width - 20,
                maxWidth: width - 20,
            }}
        >
            <Text style={Style.headerTitle}>{title}</Text>
        </View>
    )
}

export default () => {
    const { height } = useWindowDimensions()
    const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<RequestNavProp>()
    const [sended, setSended] = useState<Array<any>>([])
    const [received, setReceived] = useState<Array<any>>([])
    const [data, setData] = useState<Array<any>>([])
    const [reload, setReload] = useState<boolean>(true)

    socket.on('success_request', () => {
        onReload()
    })

    useEffect(() => {
        const API = new FriendAPI()
        ;(async () => {
            if (reload && User.id) {
                const response = await API.getUserFriendRequestReceived(User.id)
                console.log(response)
                if (!response.canceled) {
                    setReceived(response)
                }
                setReload(false)
            }
        })()

        return () => {
            API.Cancel()
        }
    }, [reload])

    useEffect(() => {
        const API = new FriendAPI()
        ;(async () => {
            if (reload && User.id) {
                const response = await API.getUserFriendRequestSended(User.id)
                if (!response.canceled) {
                    const format = response.map((el: any) => ({
                        ...el,
                        send: true,
                    }))
                    setSended(format)
                }
                setReload(false)
            }
        })()

        return () => {
            API.Cancel()
        }
    }, [reload])

    useEffect(() => {
        const metadata = [
            {
                title: `ILS M'ONT AJOUTÉ`,
                data: received.length > 0 ? received : [{ noData: true }],
            },
            {
                title: `J'AI ENVOYÉ UNE DEMANDE D'AJOUT`,
                data: sended.length > 0 ? sended : [{ noData: true }],
            },
        ]
        console.log(metadata)
        setData(metadata)
    }, [sended, received])

    const onReload = () => {
        setReload(true)
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 500)
    }

    const goToAddFriend = () => {
        navigation.navigate('add')
    }

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
                <ScrollView horizontal>
                    <SectionList
                        sections={data}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => (
                            <Item data={item} onReload={onReload} />
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <HeaderItem title={title} />
                        )}
                    />
                </ScrollView>
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
        position: 'relative',
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
        marginTop: 15,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#1B2444',
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
    },
    buttonText: {
        fontSize: 11,
    },
})
