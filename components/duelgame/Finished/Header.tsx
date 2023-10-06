import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'

interface IProps {
    name: string
}

export default ({ name }: IProps) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <Image
                source={require('../../../assets/images/duel.png')}
                style={Style.icon}
            />
            {name ? (
                <Text
                    style={{ color: '#FFFFFF', fontWeight: 'bold' }}
                >{`DUEL contre ${name}`}</Text>
            ) : null}
            <Text style={{ color: '#323D65', fontSize: 17 }}>RÉSULTATS</Text>
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
