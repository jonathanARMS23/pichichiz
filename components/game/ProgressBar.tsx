import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface IProps {
    time: number // temps écoulé
    percent: number // pourcentage chargement
    width: number
}

export default ({ time, percent, width }: IProps) => {
    const [charged, setCharged] = useState(0)
    const [waiting, setWaiting] = useState(width)

    useEffect(() => {
        const chargedWidth = (percent * width) / 100
        const waitingWidth = width - chargedWidth
        setCharged(chargedWidth)
        setWaiting(waitingWidth)
    }, [percent])

    const setBorder = (position: string) => {
        if (position === 'left') {
            if (charged > 0)
                return {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }
            if (percent === 100)
                return {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }
        }
        if (charged > 0)
            return {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            }
        return {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        }
    }

    return (
        <View style={Style.container}>
            <View style={{ ...Style.bar, minWidth: width, maxWidth: width }}>
                <View
                    style={{
                        ...Style.parts,
                        minWidth: charged,
                        maxWidth: charged,
                        ...setBorder('left'),
                        backgroundColor: '#31CCC0',
                    }}
                ></View>
                <View
                    style={{
                        ...Style.parts,
                        minWidth: waiting,
                        maxWidth: waiting,
                        ...setBorder('right'),
                        backgroundColor: '#EBECF0',
                    }}
                ></View>
            </View>
            <View style={{ ...Style.legend, minWidth: width, maxWidth: width }}>
                <Text style={Style.time}>{`${time} s`}</Text>
                <Image
                    source={require('../../assets/images/timer.png')}
                    style={Style.icon}
                />
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 20,
        maxHeight: 20,
        position: 'relative',
        borderRadius: 10,
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 20,
        maxHeight: 20,
    },
    parts: {
        flex: 1,
        minHeight: 20,
        maxHeight: 20,
    },
    legend: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        minHeight: 20,
        maxHeight: 20,
        position: 'absolute',
    },
    icon: {
        minHeight: 12,
        maxHeight: 12,
        minWidth: 10,
        maxWidth: 10,
    },
    time: {
        fontSize: 10,
    },
})
