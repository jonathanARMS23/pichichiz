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
import moment from 'moment'
import { useAppSelector } from '../../store/hooks/hooks'
import DuelStore from '../../services/store/Duel'

interface IIProps {
    data: any
}

const Item = ({ data }: IIProps) => {
    const User = useAppSelector((state) => state.user)
    const [winned, setWinned] = useState(false)

    useEffect(() => {
        if (parseInt(`${data.winner}`, 10) === parseInt(`${User.id}`, 10))
            setWinned(true)
        else setWinned(false)
    }, [data])

    return (
        <TouchableOpacity
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
                <Text
                    style={{ color: '#CC317C' }}
                >{`${data.pseudo_vs} a gagné ce duel`}</Text>
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
