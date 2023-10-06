import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface IProps {
    onPressList: any
    onPressDM: any
    option: number
}

export default ({ onPressList, onPressDM, option }: IProps) => (
    <View style={Style.container}>
        <TouchableOpacity
            style={{
                ...Style.button,
                backgroundColor: option === 1 ? '#FFFFFF' : '#1B2444',
            }}
            onPress={onPressList}
        >
            <Text style={{ color: option === 1 ? '#000000' : '#FFFFFF' }}>
                Liste de mes amis
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                ...Style.button,
                backgroundColor: option === 2 ? '#FFFFFF' : '#1B2444',
            }}
            onPress={onPressDM}
        >
            <Text style={{ color: option === 2 ? '#000000' : '#FFFFFF' }}>
                Demandes en attente
            </Text>
        </TouchableOpacity>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B2444',
        borderRadius: 10,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 40,
        maxHeight: 40,
        marginVertical: 5,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 35,
        maxHeight: 35,
        minWidth: 182.5,
        maxWidth: 182.5,
    },
})
