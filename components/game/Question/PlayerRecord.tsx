import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    // eslint-disable-next-line no-unused-vars
    const [info, setInfo] = useState<any>(null) // à revoir

    useEffect(() => {
        const extract = extractQuestionData(data)
        if (extract) setInfo(extract[0])
    }, [])

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <Image
                source={{
                    uri: `https://www.footballdatabase.eu/images/base/defaultcup.png`,
                }}
                style={Style.image}
            />
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
