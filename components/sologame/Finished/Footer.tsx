import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/tool/tool'

type FooterNavProp = StackNavigationProp<RootStackParams, 'sologame'>

interface IProps {
    rate: number
    onPress: any
}

export default ({ rate, onPress }: IProps) => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        if (rate > 7) setPassed(true)
        else setPassed(false)
    }, [])

    const onCancel = () => {
        navigation.navigate('solo')
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <TouchableOpacity onPress={onPress} style={Style.button}>
                <Text>{passed ? `NIVEAU SUIVANT` : `REESSAYER`}</Text>
                <Icon
                    name="arrow-forward"
                    fill="#000000"
                    height={20}
                    width={20}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={Style.cancel}>
                <Icon
                    name="close-circle"
                    fill="#323D65"
                    height={51}
                    width={51}
                />
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 177,
        maxHeight: 177,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 212,
        maxWidth: 212,
        backgroundColor: '#EBECF0',
    },
    cancel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 51,
        maxHeight: 51,
        minWidth: 51,
        maxWidth: 51,
    },
})
