import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useSelector } from 'react-redux'

interface IHProps {
    value: number
}

const Health = ({ value }: IHProps) => (
    <View style={Style.health}>
        <View style={Style.healthValue}>
            <Text style={Style.healthValueText}>{value}</Text>
        </View>
        <View style={Style.healthIcon}>
            <Icon name="heart-outline" height={50} width={50} fill="#CC317C" />
        </View>
    </View>
)

export default () => {
    const { width, height } = useWindowDimensions()
    const user = useSelector((state: any) => state.user)
    const { hp } = user
    const [visible, setVisible] = useState(false)
    const [hvisible, setHvisible] = useState(false)

    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }

    const onCloseH = () => {
        setHvisible(false)
    }

    const onOpenH = () => {
        setHvisible(true)
    }

    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <View style={Style.imageWrapper}>
                <Image
                    source={require('../../assets/images/solobanner.png')}
                    style={Style.banner}
                />
            </View>
            <View style={Style.controls}>
                <TouchableOpacity onPress={onOpenH} style={Style.healthButton}>
                    <Health value={hp} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onOpen} style={Style.infoButton}>
                    <Icon
                        name="info-outline"
                        height={20}
                        width={20}
                        fill="#000000"
                    />
                </TouchableOpacity>
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
                    <View style={Style.info}>
                        <View style={Style.header}>
                            <View style={Style.titleContainer}>
                                <Icon
                                    name="info-outline"
                                    height={15}
                                    width={15}
                                />
                                <Text style={Style.title}>
                                    Bienvenue dans le mode SOLO !
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={Style.exitButton}
                                onPress={onClose}
                            >
                                <Icon
                                    name="close-outline"
                                    height={20}
                                    width={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.information}>
                            <Text>
                                Réponds aux questions de chaque niveau, améliore
                                tes compétences, et débloque des nouveaux modes
                                de jeu !
                            </Text>
                            <Text>
                                Pour parvenir au niveau supérieur, tu dois
                                valider au moins 8 réponses sur 10 du niveau
                                actuel.
                            </Text>
                            <Text>
                                Une fois atteint le niveau 50, tu auras débloqué
                                le mode MULTI-JOUEURS.
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={hvisible}
                onRequestClose={onCloseH}
            >
                <View
                    style={{
                        ...Style.healthModalWrapper,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <View style={Style.healthModal}>
                        <View style={Style.header}>
                            <View style={Style.titleContainer}>
                                <Image
                                    source={require('../../assets/images/heart_broken.png')}
                                />
                                <Text
                                    style={{
                                        color: '#CC317C',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Ouups, plus de vie !
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={Style.exitButton}
                                onPress={onCloseH}
                            >
                                <Icon
                                    name="close-outline"
                                    height={20}
                                    width={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.healthTextContainer}>
                            <Text>
                                Reviens demain avec 3 nouvelles vies, ou achète
                                des vies sur le store !
                            </Text>
                        </View>
                        <View style={Style.healthButtons}>
                            <TouchableOpacity
                                style={{
                                    ...Style.Hbuttons,
                                    backgroundColor: '#1B2444',
                                }}
                            >
                                <Text style={{ color: '#FFFFFF' }}>STORE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onCloseH}
                                style={Style.Hbuttons}
                            >
                                <Text style={{ color: '#1B2444' }}>FERME</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 70,
        maxHeight: 70,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 40,
        maxHeight: 50,
        minWidth: 265,
        maxWidth: 265,
    },
    banner: {
        height: 50,
        width: 172,
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: 10,
        minHeight: 40,
        maxHeight: 50,
        minWidth: 110,
        maxWidth: 110,
    },
    infoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBECF0',
        borderRadius: 10,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
    },
    healthButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
    },
    health: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        marginHorizontal: 10,
    },
    healthIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
    },
    healthValue: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
    },
    healthValueText: {
        color: '#CC317C',
        fontSize: 9,
    },
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 300,
        maxHeight: 300,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 340,
        maxWidth: 340,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    information: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 340,
        maxWidth: 340,
        minHeight: 200,
        maxHeight: 200,
    },
    healthModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    healthModal: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        minHeight: 250,
        maxHeight: 250,
    },
    healthTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 100,
        maxHeight: 100,
    },
    healthButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 100,
        maxHeight: 100,
    },
    Hbuttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: 7,
    },
    title: {
        fontWeight: 'bold',
    },
})
