import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

interface IProps {
    size: number
    actif: boolean
}

export default ({ size, actif }: IProps) => {
    const [radius, setRadius] = useState(0)

    useEffect(() => {
        setRadius(size / 2)
    }, [])

    return (
        <View
            style={{
                height: size,
                width: size,
                borderRadius: radius,
                backgroundColor: actif ? '#31CCC0' : '#EBECF0',
            }}
        ></View>
    )
}
