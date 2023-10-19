import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) setInfo(extract[0])
    }, [])

    if (!info) return null

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <Image source={{ uri: `${info.photos}` }} style={Style.image} />
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 310,
        maxHeight: 310,
    },
    image: {
        height: 238,
        width: 159,
    },
})
