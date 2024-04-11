import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { COLORS } from '../../../utiles/constantes'

interface IProps {
    size: number
    actif: boolean | string
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
                backgroundColor: actif
                    ? COLORS.green
                    : actif === false
                    ? COLORS.red
                    : COLORS.very_light_primary,
            }}
        ></View>
    )
}
