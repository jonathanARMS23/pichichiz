import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../navigation/tool/tool'

type NoAccessNavProp = StackNavigationProp<RootStackParams, 'noaccess'>

export default () => {
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation<NoAccessNavProp>()

    const handlePress = () => {
        navigation.navigate('room', {
            screen: 'main',
            params: { screen: 'root' },
        })
    }

    return (
        <View
            style={{
                ...Style.container,
                minHeight: height,
                maxHeight: height,
                minWidth: width,
                maxWidth: width,
            }}
        >
            <Icon name="eye-off-outline" height={150} width={150} />
            <Text>Vous n'avez pas accès à cette page.</Text>
            <TouchableOpacity style={Style.button} onPress={handlePress}>
                <Text style={Style.buttonText}>Revenir au menu principal</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 275,
        maxWidth: 275,
        borderRadius: 10,
        backgroundColor: '#1B2444',
        marginVertical: 50,
    },
    buttonText: {
        color: '#FFFFFF',
    },
})
