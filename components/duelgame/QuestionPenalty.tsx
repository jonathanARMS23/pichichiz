import React, { useEffect } from 'react'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import {
    extractStadiumQuestion,
    extractGoalsQueston,
} from '../../services/factory/Duel'

interface IProps {
    type: any
    data: any
}

export default ({ data, type }: IProps) => {
    const { height, width } = useWindowDimensions()
    const questionHeight = height / 2

    useEffect(() => {
        console.log(type)
    }, [type])

    const getQuestion = () => {
        switch (type) {
            case 'player_goals':
                return extractGoalsQueston(data)
            case 'statium_attendance':
                return extractStadiumQuestion(data)
            default:
                return ''
        }
    }

    return (
        <View
            style={{
                ...Style.container,
                minHeight: questionHeight,
                maxHeight: questionHeight,
                minWidth: width,
                maxWidth: width,
            }}
        >
            <View
                style={{
                    ...Style.question,
                    minWidth: 359,
                    maxWidth: 359,
                    minHeight: questionHeight - 70,
                    maxHeight: questionHeight - 70,
                }}
            >
                <Text style={Style.questionText}>{`${getQuestion()}`}</Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 10,
    },
    questionText: {
        fontSize: 14,
        color: '#000000',
    },
})
