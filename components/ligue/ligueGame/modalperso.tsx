import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    onClose: Function
    date: string
    adversaire: string
    setReport: Function
}

interface IIProps extends IProps {
    setConfirm: Function
}

const Requete = ({ onClose, setConfirm, date }: IIProps) => {
    return (
        <View style={Style.info}>
            <View style={Style.headerModal}>
                <View style={Style.titleContainerModal}>
                    <Icon
                        name="clock-outline"
                        height={25}
                        width={25}
                        fill={COLORS.primary}
                    />
                    <Text style={Style.titleModal}>
                        {`REPORTER LE DUEL DU ${
                            date !== 'jour' ? date : 'JOUR'
                        }`}
                    </Text>
                </View>
                <TouchableOpacity
                    style={Style.exitButton}
                    onPress={() => onClose()}
                >
                    <Icon name="close-outline" height={20} width={20} />
                </TouchableOpacity>
            </View>
            <View style={Style.texte}>
                <Text
                    style={{ color: COLORS.primary }}
                >{`Si tu ne peux pas jouer ton duel ${
                    date === 'jour' ? "aujourd'hui" : `du ${date}`
                }, tu peux choisir une autre date. Ton adversaire devra accepter ou proposer une autre date.`}</Text>
            </View>
            <View style={Style.dateContainer}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: COLORS.primary,
                        marginBottom: 5,
                    }}
                >
                    Nouvelle date :
                </Text>
                <View style={Style.inputDateContainer}>
                    <Text style={{ color: COLORS.primary }}>07/10/2022</Text>
                    <Icon
                        name="calendar-outline"
                        height={25}
                        width={25}
                        color={COLORS.primary}
                    />
                </View>
            </View>
            <View style={Style.actionContainer}>
                <TouchableOpacity
                    onPress={() => setConfirm(true)}
                    style={{
                        ...Style.actionBtn,
                        backgroundColor: COLORS.light_primary,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        PROPOSER
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...Style.actionBtn,
                    }}
                    onPress={() => onClose()}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontWeight: 'bold',
                        }}
                    >
                        ANNULER
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Confirm = ({ onClose, adversaire, setReport }: IIProps) => {
    return (
        <View style={Style.info}>
            <View style={{ ...Style.headerModal, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={Style.exitButton}
                    onPress={() => onClose()}
                >
                    <Icon name="close-outline" height={20} width={20} />
                </TouchableOpacity>
            </View>
            <View style={Style.successContainer}>
                <Icon
                    name="checkmark-outline"
                    height={40}
                    width={40}
                    fill={COLORS.primary}
                />
                <Text style={{ ...Style.successItem, fontWeight: 'bold' }}>
                    Ta proposition a bien été envoyée à ton adversaire{' '}
                    {adversaire}
                </Text>
                <Text style={{ ...Style.successItem, fontSize: 12 }}>
                    {adversaire} doit maintenant accepter ta proposition ou
                    choisir une autre date
                </Text>
            </View>
            <View
                style={{
                    ...Style.actionContainer,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        ...Style.actionBtn,
                        width: 100,
                        backgroundColor: COLORS.light_primary,
                    }}
                    onPress={() => {
                        onClose()
                        setReport(true)
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ({ onClose, date, adversaire, setReport }: IProps) => {
    const [confirm, setConfirm] = useState(false)

    return !confirm ? (
        <Requete
            onClose={onClose}
            date={date}
            adversaire={adversaire}
            setConfirm={setConfirm}
            setReport={setReport}
        />
    ) : (
        <Confirm
            onClose={onClose}
            date={date}
            adversaire={adversaire}
            setConfirm={setConfirm}
            setReport={setReport}
        />
    )
}

const Style = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 300,
        maxHeight: 300,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    headerModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 340,
        maxWidth: 340,
        paddingHorizontal: 15,
    },
    titleContainerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleModal: {
        color: COLORS.primary,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    exitButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: '#EBECF0',
    },
    texte: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 310,
        maxWidth: 310,
    },
    dateContainer: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 310,
        maxWidth: 310,
    },
    inputDateContainer: {
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.very_light_primary,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    actionContainer: {
        flex: 1,
        minWidth: 250,
        maxWidth: 250,
        marginTop: 20,
    },
    actionBtn: {
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successContainer: {
        flex: 1,
        minHeight: 160,
        maxHeight: 160,
        minWidth: 280,
        maxWidth: 280,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: COLORS.green,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    successItem: {
        textAlign: 'center',
        color: COLORS.primary,
    },
})
