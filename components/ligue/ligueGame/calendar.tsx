import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Modal,
    useWindowDimensions,
} from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-eva-icons'
import { COLORS } from '../../../utiles/constantes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modalperso from './modalperso'

const data = [
    {
        adversaire: 'Jonathan',
        date: 'sam 08/10/2022',
    },
    {
        adversaire: 'Salim',
        date: 'dim 09/10/2022',
    },
    {
        adversaire: 'bammyHall',
        date: 'mar 11/10/2022',
    },
    {
        adversaire: 'Normaalvarez',
        date: 'mer 12/10/2022',
    },
    {
        adversaire: 'Ettawoods',
        date: 'jeu 13/10/2022',
    },
    {
        adversaire: 'aunawilson',
        date: 'ven 14/10/2022',
    },
]

const historique = [
    {
        resultat: 'win',
        adversaire: 'aDixon',
        moi: 2,
        lui: 1,
        date: '05/10/2022',
    },
    {
        resultat: 'lose',
        adversaire: 'Brillant',
        moi: 0,
        lui: 3,
        date: '04/10/2022',
    },
    {
        resultat: 'draw',
        adversaire: 'Danyz',
        moi: 1,
        lui: 1,
        date: '02/10/2022',
    },
]

interface IProps {
    data: {
        adversaire: string
        date: string
    }
}

interface IIProps {
    data: {
        resultat: string
        adversaire: string
        moi: number
        lui: number
        date: string
    }
}

const Item = ({ data }: IProps) => {
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    const [report, setReport] = useState(false)
    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }
    return (
        <View style={Style.item}>
            <Text style={{ ...Style.itemContent, color: COLORS.primary }}>
                {data.adversaire}
            </Text>
            <View style={{ ...Style.itemContent, ...Style.right }}>
                <Text style={{ color: COLORS.primary }}>{data.date}</Text>
                <TouchableOpacity onPress={onOpen} style={Style.reporter}>
                    <Image
                        source={require('../../../assets/images/more_time.png')}
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
                    <Modalperso
                        date={data.date}
                        jour={false}
                        adversaire={data.adversaire}
                        onClose={onClose}
                        setReportRequest={setReport}
                    />
                </View>
            </Modal>
        </View>
    )
}

const ItemHistorique = ({ data }: IIProps) => {
    return (
        <View
            style={
                data.resultat === 'win'
                    ? { ...Style.itemHistory, ...Style.win }
                    : data.resultat === 'lose'
                    ? { ...Style.itemHistory, ...Style.lose }
                    : { ...Style.itemHistory, ...Style.draw }
            }
        >
            <View style={{ ...Style.itemContent }}>
                <Text
                    style={{ marginRight: 5 }}
                >{`${data.moi} - ${data.lui}`}</Text>
                <Text
                    style={{
                        color:
                            data.resultat === 'win'
                                ? COLORS.green
                                : data.resultat === 'lose'
                                ? COLORS.red
                                : COLORS.light_primary,
                    }}
                >
                    {data.resultat === 'win'
                        ? `victoire face à ${data.adversaire}`
                        : data.resultat === 'lose'
                        ? `défaite face à ${data.adversaire}`
                        : `égalité face à ${data.adversaire}`}
                </Text>
            </View>
            <Text
                style={{ ...Style.itemContent, textAlign: 'right' }}
            >{`le ${data.date}`}</Text>
        </View>
    )
}

export default () => {
    const [content, setContent] = useState<'avenir' | 'historique'>('avenir')
    const setAfficher = () => {
        content === 'avenir' ? setContent('historique') : setContent('avenir')
    }
    return (
        <View style={{ ...Style.container, width: 375 }}>
            <View style={Style.titleContainer}>
                <View style={Style.itemTitle}>
                    <Image
                        source={require('../../../assets/images/calendar_month.png')}
                    />
                    <Text style={Style.title}>CALENDRIER (DUELS À VENIR)</Text>
                </View>
                <TouchableOpacity
                    style={{
                        ...Style.itemTitle,
                        paddingRight: 5,
                    }}
                    onPress={() => setAfficher()}
                >
                    <Text>HISTORIQUES</Text>
                </TouchableOpacity>
            </View>
            {content === 'avenir' ? (
                <FlatList
                    style={{ width: 375 }}
                    data={data}
                    keyExtractor={(item, index) => `duel${index}`}
                    renderItem={({ item, index }) => <Item data={item} />}
                />
            ) : (
                <FlatList
                    style={{ width: 375 }}
                    data={historique}
                    keyExtractor={(item, index) => `duel${index}`}
                    renderItem={({ item, index }) => (
                        <ItemHistorique data={item} />
                    )}
                />
            )}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        minHeight: 60,
        maxHeight: 60,
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    itemTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: 30,
        maxHeight: 30,
    },
    title: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    item: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reporter: {
        minWidth: 30,
        maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemHistory: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 5,
    },
    win: {
        borderWidth: 1,
        borderColor: COLORS.green,
        backgroundColor: 'rgba(225, 255, 253, 1)',
        borderRadius: 10,
    },
    lose: {
        borderWidth: 1,
        borderColor: COLORS.red,
        backgroundColor: 'rgba(255, 221, 237, 1)',
        borderRadius: 10,
    },
    draw: {
        borderWidth: 1,
        borderColor: 'rgba(50, 61, 101, 1)',
        backgroundColor: 'rgba(235, 236, 240, 1)',
        borderRadius: 10,
    },
    //// MODAL
    infoModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})
