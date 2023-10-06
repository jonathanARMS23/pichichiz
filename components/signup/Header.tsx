import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'

type SigninNav = StackNavigationProp<RootStackParams, 'signin'>

export default () => {
    const navigation = useNavigation<SigninNav>()

    const onGoBack = () => {
        navigation.goBack()
    }

    return (
        <View style={Style.container}>
            <View style={Style.firstbloc}>
                <View style={Style.bloc}>
                    <TouchableOpacity style={Style.bloc} onPress={onGoBack}>
                        <Icon
                            name="arrow-circle-left"
                            height={30}
                            width={30}
                            fill="#1B2444"
                        />
                    </TouchableOpacity>
                </View>
                <View style={Style.title}>
                    <Text style={Style.titleText}>CONNEXION</Text>
                </View>
                <View style={Style.bloc}></View>
            </View>
            <View style={Style.secondbloc}>
                <Text style={Style.text}>
                    Devenez membre, vous bénéficierez de tous les avantages :
                    nunc, vulputate, libero et velit
                </Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 120,
    },
    firstbloc: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 50,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 275,
        maxWidth: 275,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#1B2444',
    },
    bloc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
    },
    secondbloc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 70,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
    },
    text: {
        color: '#1B2444',
        fontSize: 13,
    },
})
