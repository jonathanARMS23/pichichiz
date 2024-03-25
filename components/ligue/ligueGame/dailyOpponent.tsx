import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    useWindowDimensions,
    Image,
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
    const [report, setReport] = useState(false)
    const [reportConfirm, setReportConfirm] = useState(false)
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
    ) : reportConfirm === false ? (
        <View
            style={
                report
                    ? { ...Style.containerMyOpponent, maxHeight: 120 }
                    : { ...Style.containerMyOpponent, maxHeight: 60 }
            }
        >
            <View style={Style.duelContainer}>
                <View style={Style.playerContainer}>
                    <Text style={{ fontSize: 16, letterSpacing: 1 }}>
                        ArnaudK
                    </Text>
                    <View style={Style.statut}>
                        <Statut size={10} actif={true} />
                        <Statut size={10} actif={false} />
                        <Statut size={10} actif={true} />
                    </View>
                </View>
                <View style={Style.action}>
                    <View style={Style.reporter}>
                        <TouchableOpacity onPress={onOpen}>
                            <Image
                                source={require('../../../assets/images/more_time.png')}
                            />
                        </TouchableOpacity>
                        <Text>reporter</Text>
                    </View>
                    <View style={Style.jouer}>
                        <Text style={{ fontWeight: 'bold' }}>JOUER</Text>
                    </View>
                </View>
            </View>
            {report ? (
                <View style={{ flex: 1 }}>
                    <Text style={Style.statutReport}>
                        Ta demande de report de duel au 07/10/2022 est en
                        attente
                    </Text>
                </View>
            ) : null}

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
                        setReport={setReport}
                    />
                </View>
            </Modal>
        </View>
    ) : (
        <Text style={Style.reportConfirm}>
            Duel avec ArnaudK reporté au{' '}
            <Text style={{ color: COLORS.green }}>07/10/2022</Text>
        </Text>
    )
}

const Style = StyleSheet.create({
    containerMyOpponent: {
        flex: 1,
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    duelContainer: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    statutReport: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 375,
        maxWidth: 375,
        backgroundColor: COLORS.light_primary,
        alignItems: 'center',
        borderRadius: 10,
        color: COLORS.very_light_primary,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    reportConfirm: {
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        borderRadius: 10,
        textAlignVertical: 'center',
        marginTop: 5,
        backgroundColor: COLORS.light_primary,
        color: COLORS.very_light_primary,
        paddingHorizontal: 5,
    },
    //// MODAL
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})
