import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../sous-components/Input'
import { RootStackParams } from '../../navigation/tool/tool'
import { logout } from '../../store/reducers/user'
import { clearBonus } from '../../store/reducers/bonus'
import { clearDuel } from '../../store/reducers/duel'
import { clearGame } from '../../store/reducers/game'
import { useAppSelector } from '../../store/hooks/hooks'
import { set } from '../../store/reducers/mode'

type MenuNavProp = StackNavigationProp<RootStackParams>

export default () => {
    // eslint-disable-next-line no-unused-vars
    const mode = useAppSelector((state) => state.mode)
    const Dispatch = useDispatch()
    const navigation = useNavigation<MenuNavProp>()
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const onLogout = async () => {
        Dispatch(logout())
        Dispatch(clearBonus())
        Dispatch(clearDuel())
        Dispatch(clearGame())
        await AsyncStorage.multiRemove([
            'bonus',
            'career',
            'hp',
            'palier',
            'score',
            'user',
        ])
        navigation.navigate('home')
    }

    const handleOpen = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
    }

    const onUpdate = () => {
        Dispatch(set(password))
    }

    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={handleOpen} style={{ ...Style.button }}>
                <Icon
                    name="cube"
                    height={30}
                    width={30}
                    fill={mode.dev ? '#31CCC0' : '#CC317C'}
                />
                <Text style={Style.buttonText}>{`   MODE DEVELOPPEUR`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...Style.button, opacity: 0.5 }}>
                <Icon
                    name="settings-2-outline"
                    height={30}
                    width={30}
                    fill="#000000"
                />
                <Text style={Style.buttonText}>{`   PARAMETRES`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={Style.button}>
                <Icon
                    name="power-outline"
                    height={30}
                    width={30}
                    fill="#CC317C"
                />
                <Text style={{ ...Style.buttonText, color: '#CC317C' }}>
                    {`   SE DECONNECTER`}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={handleClose}
            >
                <View style={Style.centeredView}>
                    <View style={Style.edit}>
                        <View style={Style.editHeader}>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={Style.closeButton}
                            >
                                <Icon
                                    name="close-circle"
                                    height={40}
                                    width={40}
                                    fill="#323D65"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.inputContainer}>
                            <Input
                                label={false}
                                icon={false}
                                iconName=""
                                secure={true}
                                labelText=""
                                width={280}
                                required={false}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Mot de passe"
                                bottomOnly
                            />
                        </View>
                        <View style={Style.buttonContainer}>
                            <TouchableOpacity
                                onPress={onUpdate}
                                style={{
                                    ...Style.buttons,
                                    backgroundColor: '#31CCC0',
                                }}
                            >
                                <Text>MODIFIER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: 350,
        maxWidth: 350,
        minHeight: 200,
        maxHeight: 200,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 50,
        maxHeight: 50,
    },
    buttonText: {
        fontSize: 15,
    },
    edit: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 300,
        maxHeight: 300,
        minWidth: 300,
        maxWidth: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    editHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 10,
    },
    closeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        maxWidth: 50,
        minHeight: 50,
        maxHeight: 50,
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 70,
        maxHeight: 70,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 120,
        maxHeight: 120,
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 280,
        maxWidth: 280,
        borderRadius: 10,
        marginVertical: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
