import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import OrderStore from '../../services/store/Order'
import Badge from '../sous-components/Badge'

interface IProps {
    id_order: number
}

interface IBonus {
    quantity: number
    type: string
}

const Bonus = ({ quantity, type }: IBonus) => {
    const getIcon = () => {
        switch (type) {
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

    return (
        <View style={Style.bonus}>
            <Image source={getIcon()} style={Style.image} />
            <Badge
                value={quantity}
                height={46}
                width={46}
                badgeDimension={14}
                fontSize={8}
            />
        </View>
    )
}

const HP = () => (
    <Image
        source={require('../../assets/images/hp_store.png')}
        style={{ width: 50, height: 40.97 }}
    />
)

const Pack = () => (
    <Image
        source={require('../../assets/images/premium_pack.png')}
        style={{ width: 50, height: 26.1 }}
    />
)

const Pub = () => (
    <Image
        source={require('../../assets/images/no_pub.png')}
        style={{ width: 50, height: 47.76 }}
    />
)

export default ({ id_order }: IProps) => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const API = new OrderStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed) {
                const response = await API.getOrder(id_order)
                if (!response.canceled) {
                    setData(response)
                }
            }
        })()

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [id_order])

    const getPrice = () => {
        if (data && data.type) {
            switch (data.type) {
                case 'bonus':
                    return data.name === 'PASSER' ? '1,99' : '0,99 €'
                case 'hp':
                    return '0,99 €'
                case 'pack':
                    return '4,99 €'
                case 'pub':
                    return '2,99 €'
                default:
                    return '0 €'
            }
        }
        return '0 €'
    }

    const getLabel = () => {
        if (data && data.type) {
            switch (data.type) {
                case 'bonus':
                    return `bonus ${data.name}`
                case 'hp':
                    return `VIE`
                case 'pack':
                    return 'PACK PREMIUM'
                case 'pub':
                    return 'MODE SANS PUB'
                default:
                    return ''
            }
        }
        return ''
    }

    const getIcon = () => {
        if (data && data.type) {
            switch (data.type) {
                case 'bonus':
                    return <Bonus type={data.name} quantity={data.quantity} />
                case 'hp':
                    return <HP />
                case 'pack':
                    return <Pack />
                case 'pub':
                    return <Pub />
                default:
                    return null
            }
        }
        return null
    }

    const getTotal = () => {
        if (data && data.quantity && data.price) {
            const total =
                parseInt(`${data.quantity}`, 10) * parseFloat(`${data.price}`)
            const formated = `${total.toFixed(2)}`.split('.').join(',')
            return `${formated} €`
        }
        return '0 €'
    }

    if (!data) return null

    return (
        <View style={Style.container}>
            <Image
                source={require('../../assets/images/order.png')}
                style={{ ...Style.image, marginTop: -23 }}
            />
            <View style={Style.article}>
                {getIcon()}
                <View style={Style.bill}>
                    <View style={{ ...Style.items, alignItems: 'flex-start' }}>
                        <Text style={Style.text}>{getLabel()}</Text>
                        <Text style={Style.text}>{getPrice()}</Text>
                    </View>
                    <View style={{ ...Style.items, alignItems: 'flex-end' }}>
                        <Text style={Style.bold1}>{`x${data.quantity}`}</Text>
                        <Text style={Style.bold1}>{getTotal()}</Text>
                    </View>
                </View>
            </View>
            <View style={Style.total}>
                <Text style={Style.bold2}>TOTAL</Text>
                <Text style={Style.bold2}>{getTotal()}</Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 348,
        maxWidth: 348,
        minHeight: 138,
        maxHeight: 138,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingBottom: 20,
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
    image: {
        height: 46,
        width: 46,
    },
    article: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 314,
        maxWidth: 314,
        minHeight: 60,
        maxHeight: 60,
        borderBottomWidth: 3,
        borderBottomColor: '#1B2444',
    },
    bill: {
        flex: 1,
        flexDirection: 'column',
        minWidth: 264,
        maxWidth: 264,
        minHeight: 46,
        maxHeight: 46,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    items: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 254,
        maxWidth: 254,
        minHeight: 15,
        maxHeight: 20,
        justifyContent: 'space-between',
    },
    total: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 314,
        maxWidth: 314,
        minHeight: 15,
        maxHeight: 20,
        justifyContent: 'space-between',
    },
    bold1: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1B2444',
    },
    bold2: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1B2444',
    },
    text: {
        color: '#1B2444',
    },
})
