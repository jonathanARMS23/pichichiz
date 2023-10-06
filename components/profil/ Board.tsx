import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useSelector } from 'react-redux'
import { Dialog } from '@rneui/themed'
import Input from '../sous-components/Input'
import ProfilStore from '../../services/store/Profile'

interface IProps {
    pseudo: string
}

interface SIProps {
    type: string
    value: number | string
    label: string
}

interface EIProps {
    pseudo: string
    onClose: any
}

/** const images = {
    man: require('../../assets/images/avatar2.png'),
    woman: require('../../assets/images/avatar1.png'),
} */

/** const icons = {
    medal: ,
    cup: ,
    solo: ,
} */

const { Actions, Button } = Dialog

const Stats = ({ type, value, label }: SIProps) => {
    // const [source, setSource] = useState<any>()

    /** useEffect(() => {
        switch (type) {
            case 'duel':
                setSource(icons.medal)
                break
            case 'victory':
                setSource(icons.cup)
                break
            case 'level':
                setSource(icons.solo)
                break
            default:
                setSource(icons.medal)
                break
        }
    }, []) */

    const getImage = () => {
        switch (type) {
            case 'duel':
                return require('../../assets/images/medal.png')
            case 'victory':
                return require('../../assets/images/cup.png')
            case 'level':
                return require('../../assets/images/solo.png')
            default:
                return require('../../assets/images/solo.png')
        }
    }

    return (
        <View style={Style.stats}>
            <Image source={getImage()} style={Style.statImage} />
            <Text style={Style.statValue}>{value}</Text>
            <Text style={Style.statLabel}>{label}</Text>
        </View>
    )
}

const EditPseudo = ({ pseudo, onClose }: EIProps) => {
    const [newpseudo, setNewpseudo] = useState(pseudo)

    return (
        <View style={Style.edit}>
            <View style={Style.editHeader}>
                <TouchableOpacity onPress={onClose} style={Style.closeButton}>
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
                    secure={false}
                    labelText=""
                    width={280}
                    required={false}
                    value={newpseudo}
                    onChangeText={setNewpseudo}
                    placeholder={pseudo}
                    bottomOnly
                />
            </View>
            <View style={Style.buttonContainer}>
                <TouchableOpacity
                    style={{ ...Style.buttons, backgroundColor: '#31CCC0' }}
                >
                    <Text>MODIFIER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={Style.buttons}>
                    <Text>ANNULER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ({ pseudo }: IProps) => {
    const User = useSelector((state: any) => state.user)
    const [visible, setVisible] = useState(false)
    const [pvisible, setPVisible] = useState(false)
    const [data, setData] = useState<any>(null)

    const onOpen = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    const OpenPseudo = () => {
        setVisible(false)
        setPVisible(true)
    }

    const ClosePseudo = () => {
        setPVisible(false)
    }

    useEffect(() => {
        const API = new ProfilStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed && User.id) {
                const response = await API.GetStats(User.id)
                if (!response.canceled) {
                    setData(response)
                }
            }
        })()

        return () => {
            API.Cancel()
            isSubscribed = false
        }
    }, [])

    return (
        <View style={Style.container}>
            <View style={Style.header}>
                <View style={Style.bloc}></View>
                <Image
                    source={require('../../assets/images/avatar2.png')}
                    style={Style.userImage}
                />
                <TouchableOpacity onPress={onOpen} style={Style.bloc}>
                    <Icon
                        name="edit-outline"
                        height={20}
                        width={20}
                        fill="#C3C3C3"
                    />
                </TouchableOpacity>
            </View>
            <View style={Style.pseudoContainer}>
                <Text style={Style.pseudo}>{pseudo}</Text>
            </View>
            <View style={Style.statContainer}>
                <Stats
                    type="duel"
                    value={data ? `${data.duels}` : `0`}
                    label="DUELS DISPUTES"
                />
                <Stats
                    type="victory"
                    value={data ? `${data.percent}%` : `0%`}
                    label="VICTOIRES EN DUELS"
                />
                <Stats
                    type="level"
                    value={data ? `NIVEAU ${data.level}` : `NIVEAU 1`}
                    label="DU CHEMIN DES NIVEAUX"
                />
            </View>
            <Dialog isVisible={visible} onBackdropPress={onClose}>
                <Actions>
                    <Button title="MODIFIER MA PHOTO DE PROFIL" />
                    <Button title="MODIFIER MON PSEUDO" onPress={OpenPseudo} />
                </Actions>
            </Dialog>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pvisible}
                onRequestClose={ClosePseudo}
            >
                <View style={Style.centeredView}>
                    <EditPseudo pseudo={pseudo} onClose={ClosePseudo} />
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2444',
        borderRadius: 10,
        marginTop: 70,
        minWidth: 350,
        maxWidth: 350,
        alignItems: 'center',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 350,
        maxWidth: 350,
    },
    userImage: {
        width: 100,
        height: 100,
        marginTop: -50,
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
    pseudoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 350,
        maxWidth: 350,
    },
    pseudo: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#FFFFFF',
    },
    statContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 100,
        maxHeight: 100,
        minWidth: 350,
        maxWidth: 350,
    },
    stats: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 100,
        maxWidth: 100,
        minHeight: 100,
        maxHeight: 100,
        paddingVertical: 5,
    },
    statImage: {
        width: 30,
        height: 30,
    },
    statValue: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statLabel: {
        fontSize: 7,
        fontWeight: 'bold',
        color: '#C3C3C3',
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
