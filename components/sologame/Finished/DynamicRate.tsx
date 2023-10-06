import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface IProps {
    rate: number
    setLoad: any
}

interface IRProps {
    rate: number
    show: boolean
}

const defaultWidth = 109
const defaultHeight = 50

const Rate = ({ rate, show }: IRProps) => {
    const [color, setColor] = useState('')
    const [completed, setCompleted] = useState(0)
    const [rest, setRest] = useState(defaultWidth)

    useEffect(() => {
        if (rate === 10) {
            setColor('')
        }
    }, [])

    /** color configuration */

    useEffect(() => {
        if (rate >= 8) setColor('#31CCC0')
        if (rate < 8) setColor('#CC317C')
    }, [rate])

    useEffect(() => {
        // calculate the completed bar width
        const loaded = (rate * defaultWidth) / 10
        const waiting = defaultWidth - loaded
        setCompleted(loaded)
        setRest(waiting)
    }, [rate])

    return (
        <View style={Style.container}>
            <View style={Style.bar}>
                <View
                    style={{
                        ...Style.loadingBar,
                        minWidth: completed,
                        maxWidth: completed,
                        backgroundColor: color,
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderTopRightRadius: rate === 25 ? 25 : 0,
                        borderBottomRightRadius: rate === 25 ? 25 : 0,
                    }}
                ></View>
                <View
                    style={{
                        ...Style.loadingBar,
                        minWidth: rest,
                        maxWidth: rest,
                        backgroundColor: '#EBECF0',
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        borderTopLeftRadius: rate === 0 ? 25 : 0,
                        borderBottomLeftRadius: rate === 0 ? 25 : 0,
                    }}
                ></View>
            </View>
            <View style={Style.content}>
                {show ? (
                    <Text
                        style={{
                            ...Style.rate,
                            minWidth: defaultWidth,
                            maxWidth: defaultWidth,
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}
                    >{`${rate}/10`}</Text>
                ) : null}
            </View>
        </View>
    )
}

export default ({ rate, setLoad }: IProps) => {
    const [note, setNote] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        let newNote = note
        const interval = setInterval(() => {
            if (newNote < rate) {
                newNote++
                setNote(newNote)
            } else {
                setLoaded(true)
                setLoad(true)
                clearInterval(interval)
            }
        }, 50)

        return () => {
            clearInterval(interval)
        }
    }, [rate])

    return <Rate rate={note} show={loaded} />
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 25,
        position: 'relative',
        alignSelf: 'flex-end',
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 25,
    },
    loadingBar: {
        flex: 1,
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 25,
        position: 'absolute',
    },
    rate: {
        fontSize: 9,
        textAlign: 'center',
    },
})
