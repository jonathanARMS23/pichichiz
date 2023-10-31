import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { useAppSelector } from '../../../store/hooks/hooks'

export default () => {
    const { width } = useWindowDimensions()
    const User = useAppSelector((state) => state.user)
    const Duel = useAppSelector((state) => state.duel)
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        if (parseInt(`${User.id}`, 10) === parseInt(`${Duel.id_player1}`, 10))
            setName(Duel.pseudo_player2)
        else setName(Duel.pseudo_player1)
    }, [])

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
