import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { reformatFriendsListForDuel } from '../services/factory/Friends'
import Banner from './duel/Banner'
import Header from './mode/Header'
import Friends from './duel/Friends'
import Loading from './duel/Loading'
import Duels from './duel/duel'
import Footer from './duel/Footer'
import DuelStore from '../services/store/Duel'
import FriendAPI from '../services/store/friends'

export default () => {
    const { width } = useWindowDimensions()
    const User = useSelector((state: any) => state.user)
    const [duel, setDuel] = useState<Array<any>>([])
    const [friends, setFriends] = useState<Array<any>>([])
    const [reload, setReload] = useState(true)
    const isFocused = useIsFocused()

    useEffect(() => {
        const FAPI = new FriendAPI()
        const DAPI = new DuelStore()
        let isSubscribed = true
        let timeout: number = 0
        ;(async () => {
            if (isSubscribed && reload) {
                // charger les duels en progrssion
                const D_response = await DAPI.GetInProgressDuel(User.id)
                if (!D_response.canceled && Array.isArray(D_response))
                    setDuel(D_response)

                // charger la liste des amis
                const F_response = await FAPI.getUserFriends(User.id)
                if (
                    !F_response.canceled &&
                    Array.isArray(F_response) &&
                    !D_response.canceled &&
                    Array.isArray(D_response)
                ) {
                    const extract = reformatFriendsListForDuel(
                        F_response,
                        D_response
                    )
                    console.log(extract)
                    setFriends(extract)
                    timeout = setTimeout(() => {
                        setReload(false)
                    }, 10)
                }
            }
        })()

        return () => {
            FAPI.Cancel()
            DAPI.Cancel()
            isSubscribed = false
            clearTimeout(timeout)
        }
    }, [reload])

    useEffect(() => {
        if (isFocused) {
            setReload(true)
        }
    }, [isFocused])

    if (reload) return <Loading />

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginVertical: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header isDuel />
            <Banner />
            <Duels data={duel} />
            <Friends data={friends} />
            <Footer />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
})
