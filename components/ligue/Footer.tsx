import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { MainStackParams, RootStackParams } from '../../navigation/tool/tool'

type LigueNavProp = StackNavigationProp<MainStackParams, 'liguemain'>
type RejoindreLigueProp = StackNavigationProp<RootStackParams, 'rejoindreligue'>

export default () => {
    const navigation = useNavigation<LigueNavProp>()
    const navigationRejoindre = useNavigation<RejoindreLigueProp>()
    const User = useSelector((state: any) => state.user)

    const handleCreateLigue = () => {
        navigation.navigate('manageligue')
    }

    const handlePress = async () => {
        if (User.id) {
            console.log(User)
        }
        navigationRejoindre.navigate('rejoindreligue')
    }

    return (
        <View
            style={{
                ...Style.footer,
            }}
        >
            <TouchableOpacity
                style={{
                    ...Style.buttonAdd,
                    ...Style.elevation,
                    backgroundColor: '#1B2444',
                }}
                onPress={handleCreateLigue}
            >
                <Text style={Style.buttonAddText}>{`  CRÉER UNE LIGUE`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...Style.buttonAdd,
                    borderWidth: 1,
                    borderColor: '#1B2444',
                }}
                onPress={handlePress}
            >
                <Text
                    style={{ ...Style.buttonAddText, color: '#1B2444' }}
                >{`  REJOINDRE UNE LIGUE`}</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    elevation: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 150,
        maxHeight: 150,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})
