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
import { COLORS } from '../../utiles/constantes'

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
                    source={require('../../assets/images/ligueBanner.png')}
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
                                    Bienvenue dans LIGUE !
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
                                Rejoins une ligue ou créé ta propre ligue en
                                invitant tes amis !
                            </Text>
                            <Text>
                                Tu affronteras tes adversaires par séries de
                                duel, organisé par journée de championnat.
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
        minWidth: 300,
        maxWidth: 300,
    },
    banner: {
        height: 60,
        width: 158,
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
        backgroundColor: '#EBECF0',
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
        minHeight: 250,
        maxHeight: 250,
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
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.light_primary,
    },
})
