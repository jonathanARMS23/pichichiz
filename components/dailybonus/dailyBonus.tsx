import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    useWindowDimensions,
    Modal,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useAppSelector } from '../../store/hooks/hooks'
import Badge from '../sous-components/Badge'
import DailyBonusStore from '../../services/store/daily_bonus'
import Notification from '../../services/notification'

interface IProps {
    show: boolean
}

interface IIProps {
    data: any
}

interface IDProps {
    data: any
    bonus: string
}

const Day = ({ data, bonus }: IDProps) => {
    const getIcon = () => {
        switch (bonus) {
            case 'INDICE':
                return require('../../assets/images/indice.png')
            case 'PASSER':
                return require('../../assets/images/passer.png')
            case 'DOUBLE CHANCE':
                return require('../../assets/images/double_chance.png')
            case 'TEMPS':
                return require('../../assets/images/temps.png')
            case 'LETTRES':
                return require('../../assets/images/lettres.png')
            case '50/50':
                return require('../../assets/images/cinquante.png')
            default:
                return require('../../assets/images/indice.png')
        }
    }

    const getRenderer = () => {
        if (parseInt(`${data.index}`, 10) % 5 === 0)
            return (
                <View style={Style.bonus}>
                    <Image
                        source={getIcon()}
                        style={{ width: 47, height: 47 }}
                    />
                    <Badge
                        value={1}
                        height={47}
                        width={47}
                        badgeDimension={14}
                        fontSize={8}
                    />
                </View>
            )
        if (data.filter)
            return (
                <Icon
                    name="checkmark-circle-2"
                    height={47}
                    width={47}
                    fill="#31CCC0"
                />
            )

        return <View style={Style.none}></View>
    }

    return (
        <View style={Style.DayItem}>
            <Text style={Style.DayIndex}>{data.index}</Text>
            {getRenderer()}
        </View>
    )
}

const Item = ({ data }: IIProps) => (
    <View style={Style.itemListContainer}>
        <FlatList
            data={data.list}
            keyExtractor={(item, index) => `day${index}`}
            renderItem={({ item }) => <Day data={item} bonus={data.type} />}
            horizontal
        />
    </View>
)

export default ({ show }: IProps) => {
    const user = useAppSelector((state) => state.user)
    const { height, width } = useWindowDimensions()
    const [open, setOpen] = useState<boolean>(show)
    const [data, setData] = useState<Array<any> | null>(null)

    useEffect(() => {
        const API = new DailyBonusStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed && show && user.id) {
                const response = await API.GetDailyBonus(
                    parseInt(`${user.id}`, 10)
                )
                console.log(response)
                if (!response.canceled) {
                    setData(response)
                    // checked winned bonus
                    const result = await API.WinBonus(
                        parseInt(`${user.id}`, 10)
                    )
                    if (result && !result.canceled) {
                        Notification.bonusNotification()
                    }
                }
            }
        })()

        return () => {
            API.Cancel()
            isSubscribed = false
        }
    }, [show])

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setOpen(show)
    }, [show])

    if (!data) return null

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            style={{
                ...Style.container,
                minWidth: width,
                maxWidth: width,
                minHeight: height,
                maxHeight: height,
                backgroundColor: 'rgba(27, 36, 68, 0.5)',
            }}
        >
            <View
                style={{
                    ...Style.container,
                    minWidth: width,
                    maxWidth: width,
                    minHeight: height,
                    maxHeight: height,
                    backgroundColor: 'rgba(27, 36, 68, 0.99)',
                }}
            >
                <View style={Style.header}>
                    <Text style={Style.title}>BONUS DE CONNEXION</Text>
                </View>
                <View style={Style.body}>
                    <View style={Style.subtitleContaine}>
                        <Text style={Style.subtitle}>
                            NOMBRE DE CONNEXION PAR JOUR DANS LE MOIS
                        </Text>
                    </View>
                    <View style={Style.listContainer}>
                        <ScrollView
                            horizontal
                            style={{ width: 350, height: 515 }}
                        >
                            <FlatList
                                data={data}
                                keyExtractor={(item, index) =>
                                    `bonuslist${index}`
                                }
                                renderItem={({ item }) => <Item data={item} />}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={Style.messageContainer}>
                    <Text style={Style.message}>
                        Plus tu augmentes ton nombre de connexion, plus tu
                        gagneras des bonus!
                    </Text>
                </View>
                <View style={Style.footer}>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={{
                            ...Style.footerButton,
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <Text style={{ color: '#1B2444' }}>OK !</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 50,
        maxHeight: 50,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 610,
        maxHeight: 610,
    },
    subtitleContaine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#323D65',
        borderBottomWidth: 1.5,
        minWidth: 350,
        maxWidth: 350,
        minHeight: 35,
        maxHeight: 35,
    },
    subtitle: {
        color: '#323D65',
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 515,
        maxHeight: 515,
    },
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 66,
        maxHeight: 66,
    },
    message: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        minWidth: 350,
        maxWidth: 350,
        minHeight: 55,
        maxHeight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 172,
        maxWidth: 172,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    itemListContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 75,
        maxHeight: 75,
        marginBottom: 10,
    },
    DayItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 47,
        maxWidth: 47,
        marginRight: 23,
    },
    DayIndex: {
        color: '#323D65',
        fontWeight: 'bold',
    },
    none: {
        minWidth: 47,
        maxWidth: 47,
        minHeight: 47,
        maxHeight: 47,
        borderRadius: 23.5,
        backgroundColor: '#323D65',
    },
    bonus: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        position: 'relative',
    },
})
