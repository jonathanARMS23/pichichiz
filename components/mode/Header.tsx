import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    useWindowDimensions,
    Text,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { Badge } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import Notifications from '../../services/notification'
import socket from '../../services/socket/socket'

type SoloHeaderNavProp = StackNavigationProp<RootStackParams, 'solo'>

export default () => {
    const { width, height } = useWindowDimensions()
    const [hvisible, setHvisible] = useState(false)
    const [id_duel, setId_duel] = useState<any>(null)
    const [id_serie, setId_serie] = useState<any>(null)
    const User = useSelector((state: any) => state.user)
    const navigation = useNavigation<SoloHeaderNavProp>()

    const onGoBack = () => {
        navigation.goBack()
    }

    const onCloseH = () => {
        setHvisible(false)
    }

    useEffect(() => {
        let tmp = 0
        const handleFinishSerie = (data: any) => {
            tmp += 1
            /** console.log('finished serie')
            console.log(`serie data:`)
            console.log(data)
            console.log(data.user_id)
            console.log(User.id)
            console.log(
                parseInt(`${data.user_id}`, 10) === parseInt(`${User.id}`, 10)
            ) */
            if (
                parseInt(`${data.user_id}`, 10) ===
                    parseInt(`${User.id}`, 10) &&
                tmp < 2
            ) {
                Notifications.duelNotification()
                setId_serie(data.id_serie)
                setId_duel(data.id_duel)
                setHvisible(true)
            }
        }
        const handleNotification = () => {
            Notifications.friendNotification()
        }

        socket.on('finished_serie', handleFinishSerie)

        socket.on('success_request', handleNotification)

        return () => {
            socket.off('finished_serie', handleFinishSerie)
            socket.off('success_request', handleNotification)
        }
    }, [])

    const onShow = () => {
        setHvisible(false)
        navigation.navigate('results', { id_duel, id_serie })
    }

    const openNotif = () => {
        navigation.navigate('notification')
    }

    return (
        <View style={Style.container}>
            <View style={{ ...Style.section, justifyContent: 'flex-start' }}>
                <TouchableOpacity
                    onPress={onGoBack}
                    style={{ ...Style.gobackButton, ...Style.elevation }}
                >
                    <Icon
                        name="arrow-back-outline"
                        fill="#FFFFFF"
                        height={30}
                        width={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={Style.section}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={Style.logo}
                />
            </View>
            <View style={{ ...Style.section, justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={openNotif} style={Style.notif}>
                    <Icon
                        name="bell-outline"
                        height={30}
                        width={30}
                        fill="#FFFFFF"
                    />
                    <Badge status="error" badgeStyle={Style.badge} />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={hvisible}
                onRequestClose={onCloseH}
            >
                <View
                    style={{
                        ...Style.healthModalWrapper,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <View style={Style.healthModal}>
                        <View style={Style.header}>
                            <View style={Style.titleContainer}>
                                <Icon
                                    name="bell-outline"
                                    fill="#1B2444"
                                    height={12}
                                    width={12}
                                />
                                <Text
                                    style={{
                                        color: '#1B2444',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    À vous de jouer !
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={Style.exitButton}
                                onPress={onCloseH}
                            >
                                <Icon
                                    name="close-outline"
                                    height={20}
                                    width={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.healthTextContainer}>
                            <Text>
                                Un de vos adversaires a fini sa série, jettez un
                                oeil aux résultats!
                            </Text>
                        </View>
                        <View style={Style.healthButtons}>
                            <TouchableOpacity
                                style={{
                                    ...Style.Hbuttons,
                                    backgroundColor: '#1B2444',
                                }}
                                onPress={onShow}
                            >
                                <Text style={{ color: '#FFFFFF' }}>
                                    VOIR LES RESULTATS
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    elevation: {
        shadowColor: '#B1B1B1',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    container: {
        flex: 1,
        minHeight: 75,
        maxHeight: 75,
        flexDirection: 'row',
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 100,
        maxWidth: 100,
    },
    logo: {
        width: 190,
        height: 30,
    },
    notif: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: '#1B2444',
    },
    badge: {
        marginTop: -17,
        marginRight: -7,
        height: 10,
        width: 10,
    },
    gobackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        backgroundColor: '#1B2444',
        borderRadius: 20,
    },
    healthModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    healthModal: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        minHeight: 250,
        maxHeight: 250,
    },
    healthTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 100,
        maxHeight: 100,
    },
    healthButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 100,
        maxHeight: 100,
    },
    Hbuttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: 7,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 340,
        maxWidth: 340,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#EBECF0',
    },
})
