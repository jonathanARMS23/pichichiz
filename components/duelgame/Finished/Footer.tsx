import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/tool/tool'
import { clearDuel } from '../../../store/reducers/duel'

type FooterNavProp = StackNavigationProp<RootStackParams, 'sologame'>

interface IProps {
    isEqual: boolean
    isFinished: boolean
}

export default ({ isFinished, isEqual }: IProps) => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()

    const onCancel = () => {
        dispatch(clearDuel())
        navigation.navigate('duel')
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            {isEqual ? (
                <Text style={Style.title}>Egalité, place aux "tir au but"</Text>
            ) : null}
            {isFinished ? <Text style={Style.title}>Fin du duel</Text> : null}
            <TouchableOpacity onPress={onCancel} style={Style.cancel}>
                <Icon
                    name="arrow-forward"
                    fill="#FFFFFF"
                    height={35}
                    width={35}
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
    cancel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 51,
        maxHeight: 51,
        minWidth: 51,
        maxWidth: 51,
        borderRadius: 25.5,
        backgroundColor: '#323D65',
    },
    title: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 15,
    },
})
