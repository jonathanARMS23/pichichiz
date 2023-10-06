import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Header from './Header'
import Response from '../game/Response'
import Question from '../game/Question'

interface IProps {
    data: any
    level: number
    question: number
    type: string
    onNext: any
}

export default ({ data, level, question, type, onNext }: IProps) => {
    const [time, setTime] = useState(30)
    const [elapsed, setElapsed] = useState(false)
    const [reload, setReload] = useState(false)
    const [stopped, setStopped] = useState(false)

    useEffect(() => {
        setTime(30)
        setStopped(false)
    }, [])

    const handleNext = () => {
        setReload(true)
        setElapsed(false)
        onNext()
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 50)
    }

    const upTime = () => {
        const tmp = time
        setTime(tmp + 30)
    }

    const onStop = (value: boolean) => {
        setStopped(value)
    }

    if (reload) return null

    return (
        <View style={Style.container}>
            <Header
                question={question}
                time={time}
                level={level}
                setElapsed={setElapsed}
                stopped={stopped}
            />
            <Question data={data} type={type} />
            <Response
                data={data}
                elapsed={elapsed}
                onNext={handleNext}
                upTime={upTime}
                setStopped={onStop}
            />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
})
