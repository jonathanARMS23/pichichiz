import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import Rate from './Rate'

type LevelNavProp = StackNavigationProp<RootStackParams>

interface IProps {
    level: number
    rate: number
    locked: boolean
}

export default ({ level, rate, locked }: IProps) => {
    const navigation = useNavigation<LevelNavProp>()

    const openGame = () => {
        navigation.navigate('sologame', { level })
    }

    if (locked)
        return (
            <View style={Style.locked}>
                <Icon
                    name="lock-outline"
                    width={20}
                    height={20}
                    fill="#FFFFFF"
                />
            </View>
        )

    return (
        <TouchableOpacity style={Style.container} onPress={openGame}>
            <View style={Style.level}>
                <Text style={{ fontWeight: 'bold' }}>{level}</Text>
            </View>
            <View style={Style.rate}>
                <Rate rate={rate} />
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 56,
        maxWidth: 56,
        minHeight: 54,
        maxHeight: 54,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#1B2444',
        margin: 16.5,
        position: 'relative',
    },
    locked: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 66,
        maxWidth: 66,
        minHeight: 54,
        maxHeight: 54,
        borderRadius: 15,
        margin: 16.5,
        backgroundColor: '#1B2444',
    },
    level: {
        flex: 1,
        minWidth: 66,
        maxWidth: 66,
        minHeight: 54,
        maxHeight: 54,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    rate: {
        flex: 1,
        minWidth: 47,
        maxWidth: 47,
        minHeight: 30,
        maxHeight: 30,
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: -50,
        marginRight: -53,
    },
})
