import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface IProps {
    title: string
    focused: boolean
    show?: boolean
}

export default ({ title, focused, show }: IProps) => {
    if (show)
        return (
            <Text style={focused ? Style.focused : Style.classic}>{title}</Text>
        )

    return focused ? (
        <Text style={Style.focused}>{title}</Text>
    ) : (
        <Text style={Style.focused}></Text>
    )
}

const Style = StyleSheet.create({
    classic: {
        color: '#C3C3CC3',
        fontSize: 10,
    },
    focused: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
})
