import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'

export default () => {
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }
    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <View style={Style.imageWrapper}>
                <Image
                    source={require('../../../assets/images/tournoi-banner.png')}
                    style={Style.banner}
                />
            </View>
            <View style={Style.controls}>
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
                                    height={20}
                                    width={20}
                                />
                                <Text style={Style.title}>
                                    Bienvenue dans le TOURNOIS !
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
                                Inscrit le prénom de tes amis à côté de toi et
                                lance la partie!{' '}
                                <Text style={{ fontWeight: 'normal' }}>
                                    (6 joueurs max)
                                </Text>
                            </Text>
                            <Text>
                                Vous répondrez chacun à une série de 5 questions
                                sous forme de QCM.
                            </Text>
                            <Text>
                                Celui qui obtient le plus mauvais score est{' '}
                                <Text style={{ fontWeight: 'bold' }}>
                                    éliminé
                                </Text>{' '}
                                à chaque tour.
                            </Text>
                            <Text>
                                Quand il reste 3 joueurs, les questions
                                passeront de QCM à des{' '}
                                <Text style={{ fontWeight: 'bold' }}>
                                    réponses directes
                                </Text>
                            </Text>
                        </View>
                        <View style={Style.footer}>
                            <Icon
                                name="info-outline"
                                height={20}
                                width={20}
                                fill="#000000"
                            />
                            <Text style={{ maxWidth: 310, marginLeft: 3 }}>
                                Ce jeu nécessite sérieusement un téléphone, à
                                faire tourner chacun votre tour. À jouer sans
                                modération autour d'une table avec tes amis!
                            </Text>
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
        minHeight: 70,
        maxHeight: 70,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 70,
        maxHeight: 70,
        minWidth: '78%',
        maxWidth: '78%',
    },
    banner: {
        height: 60,
        width: 200,
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 40,
        maxHeight: 50,
        minWidth: 70,
        maxWidth: 70,
    },
    infoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.very_light_primary,
        borderRadius: 10,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
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
        minHeight: 400,
        maxHeight: 400,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 330,
        maxWidth: 330,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.light_primary,
        marginLeft: 5,
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
        backgroundColor: COLORS.very_light_primary,
    },
    information: {
        flex: 1,
        minHeight: 240,
        maxHeight: 240,
        minWidth: 330,
        maxWidth: 330,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footer: {
        flexDirection: 'row',
        minWidth: 330,
        maxWidth: 330,
        minHeight: 65,
        maxHeight: 65,
        marginTop: 5,
        backgroundColor: COLORS.very_light_primary,
        borderRadius: 5,
        padding: 5,
    },
})
