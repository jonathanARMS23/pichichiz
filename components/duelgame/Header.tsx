import React, { useEffect, useState } from 'react'
import {
    View,
    Image,
    useWindowDimensions,
    Text,
    StyleSheet,
} from 'react-native'
import ProgressBar from '../game/ProgressBar'

interface IProp {
    question: number
    time: number
    level: number
    setElapsed: any
    stopped: boolean
}

export default ({ question, time, level, setElapsed, stopped }: IProp) => {
    const { width } = useWindowDimensions()
    const [chrono, setChrono] = useState(0)
    const [laps, setLaps] = useState<number>(time)

    useEffect(() => {
        setLaps(time)
        let newChrono = chrono
        const interval = setInterval(() => {
            if (newChrono < time && !stopped) {
                newChrono++
                setChrono(newChrono)
            } else {
                clearInterval(interval)
                setElapsed(true)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [time, stopped])

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <Image
                source={require('../../assets/images/duel.png')}
                style={Style.gameIcon}
            />
            <View style={Style.board}>
                <View style={Style.gameInfo}>
                    <Text
                        style={Style.question}
                    >{`QUESTION ${question}/5`}</Text>
                    <Text style={Style.level}>{`SERIE ${level}`}</Text>
                </View>
                <ProgressBar
                    width={281}
                    time={chrono}
                    percent={(chrono * 100) / laps}
                />
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        maxHeight: 70,
    },
    gameIcon: {
        height: 60,
        width: 60,
    },
    board: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 290,
        maxWidth: 290,
        minHeight: 60,
        maxHeight: 60,
    },
    gameInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 290,
        maxWidth: 290,
        minHeight: 30,
        maxHeight: 30,
        paddingHorizontal: 10,
    },
    question: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    level: {
        fontSize: 10,
    },
})
