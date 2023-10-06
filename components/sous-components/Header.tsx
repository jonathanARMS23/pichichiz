import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Badge } from '@rneui/themed'
import { RootStackParams } from '../../navigation/tool/tool'

type navProp = StackNavigationProp<RootStackParams>

export default () => {
    const navigation = useNavigation<navProp>()

    const handlePress = () => {
        navigation.navigate('notification')
    }

    return (
        <View style={Style.container}>
            <View style={Style.section}></View>
            <View style={Style.section}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={Style.logo}
                />
            </View>
            <View style={Style.section}>
                <TouchableOpacity onPress={handlePress} style={Style.notif}>
                    <Icon
                        name="bell-outline"
                        height={30}
                        width={30}
                        fill="#FFFFFF"
                    />
                    <Badge status="error" badgeStyle={Style.badge} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 75,
        maxHeight: 75,
        flexDirection: 'row',
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 100,
        maxWidth: 100,
    },
    logo: {
        width: 190,
        height: 30,
    },
    notif: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: '#1B2444',
    },
    badge: {
        marginTop: -17,
        marginRight: -7,
        height: 10,
        width: 10,
    },
})
