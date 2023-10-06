import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'

interface IProps {
    level: number
}

export default ({ level }: IProps) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <Image
                source={require('../../../assets/images/gameIcon.png')}
                style={Style.icon}
            />
            <Text style={{ color: '#EBECF0' }}>{`NIVEAU ${level}`}</Text>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 94,
        maxHeight: 94,
    },
    icon: {
        height: 60,
        width: 60,
    },
})
