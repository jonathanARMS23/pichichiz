import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    useWindowDimensions,
    Text,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    verified: boolean
    id: number | string
    response: string
    responseId: number | string
    verify: any
    setValid: any
    chance: any
    setChance: any
    setStopped: any
}

export default ({
    response, // la réponse en affichage
    id, // la valeur de la réponse
    responseId, // la valeur de la bonne réponse
    verified, // variable qui indique que la vérification a été faite ou pas
    verify, // fonction qui active la vérification
    setValid, // fonction utiliser pour modifier la variable "valid" utilisé par onNext() qui indique qu'on a validé ou pas la question
    chance, // nombre de chance lier au bonus chance
    setChance, // fonciton pour modifier le nombre de chance
    setStopped, // fonction utilisé pour stopper le chrono
}: IProps) => {
    const { width } = useWindowDimensions()
    const [result, setResult] = useState(false) // variable intérrupteur qui active la vérification de l'option selectionné si c'était la bonne ou pas
    const [starter, setStarter] = useState(false) // variable intérrupteur pour indiquer que l'option a été séléctionné

    useEffect(() => {
        if (verified) {
            if (id === responseId) setResult(true)
            else setResult(false)
        }
    }, [verified, chance])

    useEffect(() => {
        if (verified && starter && result) setValid(true)
    }, [verified, starter, result])

    const onSelect = () => {
        if (id === responseId) setResult(true)
    }

    const handlePress = () => {
        const tmp = chance
        if (tmp - 1 > 0) setChance(tmp - 1)
        setStarter(true)
        onSelect()
        // on va vérifier les chance
        if (tmp - 1 === 0) {
            setStopped(true)
            verify(true)
        }

        // if (tmp - 1 === 0 || (id === responseId && starter)) verify(true)
    }

    const setBackground = () => {
        if (verified && result) return '#31CCC0'
        if (starter && result) return '#31CCC0'
        if (starter && !result) return '#CC317C'
        return '#1B2444'
    }

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <TouchableOpacity
                onPress={handlePress}
                style={{ ...Style.button, backgroundColor: setBackground() }}
            >
                <View></View>
                <Text
                    style={{
                        fontSize: 17,
                        color: starter || result ? '#000000' : '#FFFFFF',
                    }}
                >{`${response}`}</Text>
                {starter || (verified && result) ? (
                    <Icon
                        name={result ? 'checkmark-circle-2' : 'close-circle'}
                        fill={result ? '#1CA499' : '#A61C5E'}
                        height={30}
                        width={30}
                    />
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
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
