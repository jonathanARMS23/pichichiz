import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Platform,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../mode/Header'
import { COLORS, FONT_WEIGHT } from '../../utiles/constantes'
import Statut from '../sous-components/Statut'
import { Icon } from 'react-native-eva-icons'

interface IIProps {
    data: {
        actif: boolean
        name: string
        user?: string
    }
}

const data = [
    {
        actif: true,
        name: 'Laulau4',
        user: 'me',
    },
    {
        actif: true,
        name: 'ArnaudK',
    },
    {
        actif: false,
        name: 'Jonathan',
    },
]

const Item = ({ data }: IIProps) => {
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    // const User = useSelector((state: any) => state.user)

    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={data.actif} />
                <Text style={{ marginLeft: 8 }}>
                    {data.user ? `${data.name} (moi)` : data.name}
                </Text>
            </View>
            <TouchableOpacity onPress={onOpen} style={Style.playerActionButton}>
                <Text style={Style.buttonModal}>{data.user ? 'X' : ''}</Text>
            </TouchableOpacity>
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
                                <Text style={Style.buttonModal}>X</Text>
                                <Text style={Style.titleModal}>
                                    QUITTER LA LIGUE
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
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Es-tu sûr de vouloir quitter la ligue FBDB ?
                            </Text>
                        </View>
                        <View style={Style.actionButtonContainer}>
                            <TouchableOpacity
                                style={{
                                    ...Style.actionButton,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.red,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#ffffff',
                                    }}
                                >
                                    OUI, PARTIR
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Style.actionButton}>
                                <Text style={{ color: COLORS.primary }}>
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

export default () => {
    const { width } = useWindowDimensions()
    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginVertical: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header />
            <View style={{ ...Style.banner, width: width }}>
                <Text style={{ ...Style.title, color: '#FFFFFF' }}>
                    LIGUE FBDB
                </Text>
                <Text style={{ color: '#ffffff', fontStyle: 'italic' }}>
                    EN ATTENTE DE TOUS LES MEMBRES
                </Text>
            </View>
            <View style={Style.dataContainer}>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>MEMBRES DE LA LIGUE:</Text>
                </View>
                <ScrollView horizontal>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => `duel${index}`}
                        renderItem={({ item }) => <Item data={item} />}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        // paddingVertical: 10,
    },
    banner: {
        height: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    titleContainer: {
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 2,
        borderColor: COLORS.primary,
    },
    /////ITEM
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: COLORS.primary,
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minWidth: 20,
        maxWidth: 20,
    },
    buttonModal: {
        fontSize: 20,
        color: COLORS.red,
        fontWeight: 'bold',
    },

    //// MODAL
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    info: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around',
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
        color: COLORS.red,
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
    information: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 340,
        maxWidth: 340,
    },
    actionButtonContainer: {
        flex: 1,
    },
    actionButton: {
        flex: 1,
        minWidth: 300,
        maxWidth: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
