import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    FlatList,
    Modal,
    Image,
} from 'react-native'
import React, { useState } from 'react'
import DailyOpponent from './dailyOpponent'
import { COLORS } from '../../../utiles/constantes'
import ItemDuel from './itemDuel'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    setScreen: Function
}

interface IIProps {
    user: any
    ligueCreator: any
    onOpen: Function
}

const data = [
    {
        finished: true,
        player1: {
            nom: 'Danyz',
            score: 2,
        },
        player2: {
            nom: 'Brillant',
            score: 1,
        },
    },
    {
        finished: true,
        player1: {
            nom: 'bammyHall',
            score: 3,
        },
        player2: {
            nom: 'didiboot',
            score: 0,
        },
    },
    {
        finished: true,
        player1: {
            nom: 'Normaalvarez',
            score: 1,
        },
        player2: {
            nom: 'Brillant',
            score: 1,
        },
    },
    {
        finished: false,
        player1: {
            nom: 'Jonathan',
            score: 0,
        },
        player2: {
            nom: 'Salim',
            score: 2,
        },
        manche1: 'Salim',
        manche2: 'Salim',
        manche3: '',
    },
    {
        finished: false,
        player1: {
            nom: 'aunaWilson',
            score: 0,
        },
        player2: {
            nom: 'bibiHolmes',
            score: 2,
        },
        manche1: 'aunaWilson',
        manche2: 'bibiHolmes',
        manche3: 'bibiHolmes',
    },
    {
        finished: false,
        player1: {
            nom: 'aDixon',
            score: 0,
        },
        player2: {
            nom: 'jon',
            score: 2,
        },
        manche1: 'aDixon',
        manche2: 'aDixon',
        manche3: 'aDixon',
    },
    {
        finished: false,
        player1: {
            nom: 'aDixon',
            score: 0,
        },
        player2: {
            nom: 'jon',
            score: 2,
        },
        manche1: 'aDixon',
        manche2: 'aDixon',
        manche3: 'aDixon',
    },
    {
        finished: false,
        player1: {
            nom: 'Jonathan',
            score: 0,
        },
        player2: {
            nom: 'Salim',
            score: 2,
        },
        manche1: 'Salim',
        manche2: 'Salim',
        manche3: '',
    },
]

const Liste = ({ user, ligueCreator, onOpen }: IIProps) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            {data.map((item, index) => (
                <ItemDuel data={item} key={index} />
            ))}
            {user === ligueCreator ? (
                <View style={Style.terminerContainer}>
                    <Text style={{ color: COLORS.primary }}>
                        Avec le mode de jeu "infini", la journée se terminera
                        lorsque tous les joueurs auront effectués leurs duels.
                        Cependant, si ub joueur est inactif, en tant que
                        créateur tu peux arrêter manuellement la journée
                    </Text>
                    <View style={Style.btnTerminerContainer}>
                        <TouchableOpacity onPress={() => onOpen()}>
                            <Text style={{ color: COLORS.red }}>
                                TERMINER LA JOURNEE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </ScrollView>
    )
}

export default ({ setScreen }: IProps) => {
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }
    return (
        <View style={{ ...Style.container, maxWidth: 375 }}>
            <Text style={Style.title}>MON ADVERSAIRE DU JOUR</Text>
            <DailyOpponent />
            <Text style={Style.title}>
                LISTE DES AFFRONTEMENTS DE LA JOURNEE
            </Text>
            <Liste ligueCreator="Laulau4" user="Laulau4" onOpen={onOpen} />
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
                    <View style={Style.info}>
                        <View style={Style.headerModal}>
                            <View style={Style.titleContainerModal}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={require('../../../assets/images/front_hand.png')}
                                />
                                <View style={Style.textTitleContainer}>
                                    <Text style={Style.titleModal}>
                                        TERMINER UNE JOURNEE
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLORS.light_primary,
                                        }}
                                    >
                                        LIGUE SPORT360° - JOURNEE 4
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => onClose()}
                                style={Style.exitButton}
                            >
                                <Icon
                                    name="close-outline"
                                    height={20}
                                    width={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.textContainer}>
                            <Text style={{ color: COLORS.light_primary }}>
                                Attention, soit bien sûr que les joueurs actifs
                                aient pu jouer. Les joueurs inactifs auront 0
                                point (match perdu)
                            </Text>
                            <Text style={{ color: COLORS.light_primary }}>
                                Aucun retour en arrière ne sera possible si tu
                                décide de terminer la journée
                            </Text>
                        </View>
                        <View style={Style.actionContainer}>
                            <TouchableOpacity
                                style={{
                                    ...Style.actionBtn,
                                    backgroundColor: COLORS.red,
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    TERMINER LA JOURNEE
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
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flex: 1,
        color: COLORS.primary,
        fontWeight: 'bold',
        minHeight: 60,
        maxHeight: 60,
        textAlignVertical: 'bottom',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    terminerContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btnTerminerContainer: {
        minHeight: 40,
        maxHeight: 40,
        width: 375 / 2,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    //MODAL
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
        paddingTop: 15,
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
        alignItems: 'flex-start',
    },
    textTitleContainer: {
        marginLeft: 5,
    },
    titleModal: {
        color: COLORS.red,
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
    textContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    actionContainer: {
        flex: 1,
        minWidth: 250,
        maxWidth: 250,
        // marginTop: 20,
    },
    actionBtn: {
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
