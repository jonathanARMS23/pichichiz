import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    useWindowDimensions,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../utiles/constantes'
import Statut from '../../sous-components/Statut'
import ItemOpponent, { Player } from './itemDuel'
import { Icon } from 'react-native-eva-icons'
import Modalperso from './modalperso'

const data = {
    finished: false,
    player1: {
        nom: 'Laulau4',
        score: 1,
    },
    player2: {
        nom: 'ArnaudK',
        score: 1,
    },
}

export default () => {
    const isFinished = data.finished
    const score1 = data.player1.score
    const score2 = data.player2.score
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }
    return isFinished ? (
        <View style={Style.containerMyOpponent}>
            {score1 > score2 ? (
                <Player statut="win" nom={data.player1.nom} data={data} />
            ) : score1 < score2 ? (
                <Player statut="lose" nom={data.player1.nom} data={data} />
            ) : (
                <Player statut="draw" nom={data.player1.nom} data={data} />
            )}
            <Text style={Style.score}>
                {`${score1}`} - {`${score2}`}
            </Text>
            {score1 > score2 ? (
                <Player statut="lose" nom={data.player2.nom} data={data} />
            ) : score1 < score2 ? (
                <Player statut="win" nom={data.player2.nom} data={data} />
            ) : (
                <Player statut="draw" nom={data.player2.nom} data={data} />
            )}
        </View>
    ) : (
        <View style={Style.containerMyOpponent}>
            <View style={Style.playerContainer}>
                <Text style={{ fontSize: 16, letterSpacing: 1 }}>ArnaudK</Text>
                <View style={Style.statut}>
                    <Statut size={10} actif={true} />
                    <Statut size={10} actif={false} />
                    <Statut size={10} actif={true} />
                </View>
            </View>
            <View style={Style.action}>
                <View style={Style.reporter}>
                    <TouchableOpacity onPress={onOpen}>
                        <Icon
                            name="clock-outline"
                            height={30}
                            width={30}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>
                    <Text>reporter</Text>
                </View>
                <View style={Style.jouer}>
                    <Text style={{ fontWeight: 'bold' }}>JOUER</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View
                    style={{
                        ...Style.infoModalWrapper,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <Modalperso
                        date="jour"
                        adversaire="ArnaudK"
                        onClose={onClose}
                    />
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    containerMyOpponent: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    playerContainer: {
        flex: 1,
    },
    statut: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 5,
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
    },
    reporter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    jouer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 10,
    },
    score: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    //// MODAL
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})
