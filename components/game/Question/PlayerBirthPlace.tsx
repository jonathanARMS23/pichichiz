/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import moment from 'moment'
import { extractQuestionData } from '../../../services/factory/Game'

interface IProps {
    data: any
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const extract = extractQuestionData(data)
        console.log('birth place')
        console.log(data)
        console.log(extract)
        if (extract) {
            console.log(extract)
            setInfo(extract)
        }
    }, [])

    if (!info) return null

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <Image source={{ uri: `${info.photos}` }} style={Style.image} />
            <Text style={Style.name}>{`${info.first_name} ${info.name}`}</Text>
            <Text style={Style.text}>{`Né le: ${moment(info.birth_date).format(
                'DD-MM-YYYY'
            )}`}</Text>
            {info.death_date && info.death_date !== '' ? (
                <Text style={Style.text}>{`Décédé le: ${moment(
                    info.death_date
                ).format('DD-MM-YYYY')}}`}</Text>
            ) : null}
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
    name: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 10,
    },
})
