import React, { useState, useEffect } from 'react'
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    verified: boolean
    id: number | string
    response: string
    responseId: number | string
}

export default ({
    response, // la réponse en affichage
    id, // la valeur de la réponse
    responseId, // la valeur de la bonne réponse
    verified, // variable qui indique que la vérification a été faite ou pas
}: IProps) => {
    const { width } = useWindowDimensions()
    const [result, setResult] = useState(false) // variable intérrupteur qui active la vérification de l'option selectionné si c'était la bonne ou pas

    useEffect(() => {
        if (verified) {
            if (id === responseId) setResult(true)
            else setResult(false)
        }
    }, [verified])

    const setBackground = () => {
        if (verified && result) return '#31CCC0'
        return '#CC317C'
    }

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <View style={{ ...Style.button, backgroundColor: setBackground() }}>
                <View></View>
                <Text
                    style={{
                        fontSize: 17,
                        color: result ? '#000000' : '#FFFFFF',
                    }}
                >{`${response}`}</Text>
                {verified && result ? (
                    <Icon
                        name={result ? 'checkmark-circle-2' : 'close-circle'}
                        fill={result ? '#1CA499' : '#A61C5E'}
                        height={30}
                        width={30}
                    />
                ) : (
                    <View></View>
                )}
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        backgroundColor: '#1B2444',
        marginVertical: 4,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 45,
        maxHeight: 45,
        minWidth: 341,
        maxWidth: 341,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
})
