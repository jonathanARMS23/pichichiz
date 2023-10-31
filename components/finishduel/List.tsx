import React, { useState, useEffect } from 'react'
import {
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import { RootStackParams } from '../../navigation/tool/tool'
import { useAppSelector, useAppDispatch } from '../../store/hooks/hooks'
import { CreateDuel } from '../../store/reducers/duel'
import DuelStore from '../../services/store/Duel'

interface IIProps {
    data: any
}

type finishduelNavProp = StackNavigationProp<RootStackParams, 'duelfinished'>

const Item = ({ data }: IIProps) => {
    const navigation = useNavigation<finishduelNavProp>()
    const User = useAppSelector((state) => state.user)
    const Dispatch = useAppDispatch()
    const [winned, setWinned] = useState(false)

    useEffect(() => {
        if (parseInt(`${data.winner}`, 10) === parseInt(`${User.id}`, 10))
            setWinned(true)
        else setWinned(false)
    }, [data])

    const handleSelect = async () => {
        Dispatch(
            CreateDuel({
                id_player1: data.id_user,
                pseudo_player1: data.pseudo_player1,
                id_player2: data.id_friend,
                pseudo_player2: data.pseudo_player2,
                score_player1: data.score_player1,
                score_player2: data.score_player2,
                id_duel: data.id_duel,
                id_serie: data.id_serie,
                winner: data.winner,
            })
        )
        console.log({
            id_player1: data.id_user,
            pseudo_player1: data.pseudo_player1,
            id_player2: data.id_friend,
            pseudo_player2: data.pseudo_player2,
            score_player1: data.score_player1,
            score_player2: data.score_player2,
            id_duel: data.id_duel,
            id_serie: data.id_serie,
        })
        navigation.navigate('bilan')
    }

    return (
        <TouchableOpacity
            onPress={handleSelect}
            style={{
                ...Style.item,
                borderColor: winned ? '#31CCC0' : '#CC317C',
                backgroundColor: winned ? '#E1FFFD' : '#FFDDED',
            }}
        >
            <Text>{`le ${moment(data.created_at).format('DD/MM/YYYY')}`}</Text>
            {winned ? (
                <Text style={{ color: '#31CCC0' }}>Tu as remporté ce duel</Text>
            ) : (
                <Text style={{ color: '#CC317C' }}>{`${
                    parseInt(`${data.id_user}`, 10) ===
                    parseInt(`${User.id}`, 10)
                        ? data.pseudo_player2
                        : data.pseudo_player1
                } a gagné ce duel`}</Text>
            )}
            <View style={Style.imageContainer}>
                {winned ? (
                    <Image
                        source={require('../../assets/images/winned.png')}
                        style={{ width: 28, height: 40.73 }}
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/losed.png')}
                        style={{ width: 28, height: 28 }}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default () => {
    const [data, setData] = useState<Array<any>>([])
    const { width } = useWindowDimensions()
    const User = useAppSelector((state) => state.user)

    useEffect(() => {
        const API = new DuelStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed && User.id) {
                const response = await API.GetMyFinishedDuel(
                    parseInt(`${User.id}`, 10)
                )
                if (response && !response.canceled && Array.isArray(response)) {
                    setData(response)
                }
            }
        })()

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [])

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <ScrollView horizontal>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `finisheduel${index}`}
                    renderItem={({ item }) => <Item data={item} />}
                />
            </ScrollView>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 360,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 5,
        minWidth: 361,
        maxWidth: 361,
        minHeight: 60,
        maxHeight: 60,
        marginVertical: 5,
        borderWidth: 1.5,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        minHeight: 45,
        maxHeight: 45,
        minWidth: 45,
        maxWidth: 45,
    },
})
