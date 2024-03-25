import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import Banner from './ligue/Banner'
import Header from './mode/Header'
import Loading from './ligue/Loading'
import Ligue from './ligue/Ligue'
import Invitation from './ligue/Invitation'
import Footer from './ligue/Footer'
import LigueStore from '../services/store/Ligue'

export default () => {
    const { width } = useWindowDimensions()
    const User = useSelector((state: any) => state.user)
    const [reload, setReload] = useState(true)
    const [ligues, setLigues] = useState<any[]>([])
    const [invitations, setInvitations] = useState<any[]>([])
    const isFocused = useIsFocused()

    // useEffect(() => {
    //     const API = new LigueStore()
    //     let isSubscribed = true
    //     if (isSubscribed && reload && User?.id) {
    //         ;(async () => {
    //             // get ligue
    //             const response = await API.getLigues(parseInt(`${User.id}`, 10))
    //             if (!response.canceled) setLigues(response)
    //             // get invitations
    //             const result = await API.getInvitationByUser(
    //                 parseInt(`${User.id}`, 10)
    //             )
    //             if (!result.canceled) setInvitations(result)
    //             setReload(false)
    //         })()
    //     }

    //     return () => {
    //         isSubscribed = false
    //         API.Cancel()
    //     }
    // }, [reload])

    // useEffect(() => {
    //     if (isFocused) {
    //         setReload(true)
    //     }
    // }, [isFocused])

    // if (reload) return <Loading />

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
            <Ligue data={ligues} />
            <Invitation data={invitations} />
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
