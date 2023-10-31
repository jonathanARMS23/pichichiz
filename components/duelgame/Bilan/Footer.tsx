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
import { useAppSelector } from '../../../store/hooks/hooks'

type FooterNavProp = StackNavigationProp<RootStackParams, 'bilan'>

export default () => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const Duel = useAppSelector((state) => state.duel)
    const User = useAppSelector((state) => state.user)
    const dispatch = useDispatch()

    const onCancel = () => {
        dispatch(clearDuel())
        navigation.navigate('duel')
    }

    if (parseInt(`${Duel.winner}`, 10) === parseInt(`${User.id}`, 10))
        return (
            <View
                style={{ ...Style.container, minWidth: width, maxWidth: width }}
            >
                <Text style={Style.title}>Quitter</Text>
                <TouchableOpacity onPress={onCancel} style={Style.cancel}>
                    <Icon
                        name="close-outline"
                        fill="#FFFFFF"
                        height={35}
                        width={35}
                    />
                </TouchableOpacity>
            </View>
        )

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <TouchableOpacity style={Style.revenge}>
                <Text style={{ color: '#1B2444' }}>REVANCHE</Text>
                <Icon
                    name="arrow-forward-outline"
                    fill="#1B2444"
                    height={35}
                    width={35}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={Style.cancel}>
                <Icon
                    name="close-outline"
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
    revenge: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: 194,
        maxWidth: 194,
        minHeight: 60,
        maxHeight: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
})
