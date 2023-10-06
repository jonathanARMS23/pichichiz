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
import { RootStackParams } from '../../navigation/tool/tool'

type WaitNavProp = StackNavigationProp<RootStackParams, 'duelgame'>

export default () => {
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation<WaitNavProp>()

    const handlePress = () => {
        navigation.navigate('solo')
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
            <Icon
                name="alert-triangle-outline"
                fill="#CC317C"
                height={150}
                width={150}
            />
            <Text>
                Une erreur est survenue lors du chargement des questions.
            </Text>
            <TouchableOpacity style={Style.button} onPress={handlePress}>
                <Text style={Style.buttonText}>Revenir au menu</Text>
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
