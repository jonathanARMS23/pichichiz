import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Header from './Header'
import Response from './Response'
import Question from '../game/Question'
import InterLevel from './InterLevel'

interface IProps {
    data: any
    level: number
    question: number
    type: string
    onNext: any
    vs: string
}

export default ({ data, level, question, type, onNext, vs }: IProps) => {
    const [time, setTime] = useState(30)
    const [elapsed, setElapsed] = useState(false)
    const [reload, setReload] = useState(false)
    const [stopped, setStopped] = useState(false)

    useEffect(() => {
        setTime(30)
        setStopped(false)
    }, [])

    const handleNext = async (valid: boolean) => {
        setReload(true)
        setElapsed(false)
        await onNext(valid)
        setTimeout(() => {
            setReload(false)
        }, 50)
    }

    const upTime = () => {
        const tmp = time
        setTime(tmp + 30)
    }

    const onStop = (value: boolean) => {
        setStopped(value)
    }

    if (reload) return <InterLevel name={vs} />

    return (
        <View
            style={{
                ...Style.container,
                marginTop: Platform.OS === 'ios' ? 35 : 0,
            }}
        >
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
