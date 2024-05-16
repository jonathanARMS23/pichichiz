import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'

interface IProps {
    onSelect: any
}

export default ({ onSelect }: IProps) => {
    const handleSelect = () => {
        onSelect({
            type: 'hp',
        })
    }

    return (
        <TouchableOpacity onPress={handleSelect} style={Style.hpItem}>
            <View style={Style.hp}>
                <Image
                    source={require('../../assets/images/hp_store.png')}
                    style={Style.image}
                />
            </View>
            <View style={Style.desc}>
                <Text style={Style.type}>ACHETER 1 VIE</Text>
            </View>
            <View style={Style.price}>
                <Text style={Style.priceText}>{`0,99 €`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    hpItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 113,
        maxWidth: 113,
        minHeight: 144,
        maxHeight: 144,
        borderRadius: 10,
        backgroundColor: '#EDB3CF',
    },
    hp: {
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
        height: 56.44,
        width: 66.44,
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
        backgroundColor: '#CC317C',
    },
    priceText: {
        color: '#FFFFFF',
    },
})
