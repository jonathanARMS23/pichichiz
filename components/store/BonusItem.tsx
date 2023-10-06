import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import Badge from '../sous-components/Badge'

interface IProps {
    type: string
    onSelect: any
}

export default ({ type, onSelect }: IProps) => {
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

    const getBackground = () => {
        switch (type) {
            case 'INDICE':
                return '#D9D0EB'
            case 'PASSER':
                return '#C2CBEE'
            case 'DOUBLE CHANCE':
                return '#BEE2EB'
            case 'TEMPS':
                return '#E3BDAC'
            case 'LETTRES':
                return '#EBECF0'
            case '50/50':
                return '#FAEBB3'
            default:
                return '#EBECF0'
        }
    }

    const getPrice = () => {
        switch (type) {
            case 'INDICE':
                return '2,79'
            case 'PASSER':
                return '2,79'
            case 'DOUBLE CHANCE':
                return '2,79'
            case 'TEMPS':
                return '2,79'
            case 'LETTRES':
                return 0
            case '50/50':
                return '2,79'
            default:
                return 0
        }
    }

    const getPriceBackground = () => {
        switch (type) {
            case 'INDICE':
                return '#543F84'
            case 'PASSER':
                return '#3E4F93'
            case 'DOUBLE CHANCE':
                return '#316C7A'
            case 'TEMPS':
                return '#975E46'
            case 'LETTRES':
                return '#EBECF0'
            case '50/50':
                return '#C2A01F'
            default:
                return '#EBECF0'
        }
    }

    const handleSelect = () => {
        onSelect({
            type: 'bonus',
            name: type,
        })
    }

    return (
        <TouchableOpacity
            onPress={handleSelect}
            style={{ ...Style.bonusItem, backgroundColor: getBackground() }}
        >
            <View style={Style.bonus}>
                <Image source={getIcon()} style={Style.image} />
                <Badge
                    value={1}
                    height={46}
                    width={46}
                    badgeDimension={14}
                    fontSize={8}
                />
            </View>
            <View style={Style.desc}>
                <Text>1 bonus</Text>
                <Text style={Style.type}>{type}</Text>
            </View>
            <View
                style={{
                    ...Style.price,
                    backgroundColor: getPriceBackground(),
                }}
            >
                <Text style={Style.priceText}>{`${getPrice()} €`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    bonusItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 113,
        maxWidth: 113,
        minHeight: 144,
        maxHeight: 144,
        borderRadius: 10,
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
    desc: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 100,
        maxWidth: 100,
        minHeight: 41,
        maxHeight: 41,
    },
    type: {
        fontWeight: 'bold',
    },
    price: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minWidth: 53,
        maxWidth: 53,
        minHeight: 20,
        maxHeight: 20,
    },
    priceText: {
        color: '#FFFFFF',
    },
})
