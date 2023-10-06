import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/tool/tool'

type notificationNavProp = StackNavigationProp<RootStackParams, 'notification'>

export default () => {
    const navigation = useNavigation<notificationNavProp>()
    const { width } = useWindowDimensions()

    const handleClick = () => {
        navigation.goBack()
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <View style={Style.top}>
                <TouchableOpacity onPress={handleClick} style={Style.back}>
                    <Icon
                        name="arrow-back-outline"
                        height={25}
                        width={25}
                        fill="#FFFFFF"
                    />
                </TouchableOpacity>
                <View style={Style.notif}>
                    <Icon
                        name="bell-outline"
                        height={34}
                        width={30}
                        fill="#FFFFFF"
                    />
                </View>
                <View style={Style.fakeBloc}></View>
            </View>
            <View style={Style.bottom}>
                <Text style={Style.title}>MES NOTIFICATIONS</Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        minHeight: 87,
        maxHeight: 87,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
        minHeight: 50,
        maxHeight: 50,
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        minHeight: 37,
        maxHeight: 37,
    },
    back: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 32,
        maxWidth: 32,
        minHeight: 32,
        maxHeight: 32,
        borderRadius: 16,
        backgroundColor: '#1B2444',
    },
    notif: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        maxWidth: 50,
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 25,
        backgroundColor: '#1B2444',
    },
    title: {
        fontSize: 20,
        color: '#1B2444',
    },
    fakeBloc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 32,
        maxWidth: 32,
        minHeight: 32,
        maxHeight: 32,
    },
})
