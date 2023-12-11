import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { InitSologameRoadmap } from '../services/factory/Game'
import Roadmap from './solo/Roadmap'
import Banner from './solo/Banner'
import Header from './mode/Header'

export default () => {
    const [data, setData] = useState<Array<any>>([])
    const { width } = useWindowDimensions()
    const user = useSelector((state: any) => state.user)
    const [reload, setReload] = useState(false)
    const { career } = user

    useEffect(() => {
        // new version of roadmap
        setReload(true)
        const extract = InitSologameRoadmap(career)
        setData(extract)
        const timeout = setTimeout(() => {
            setReload(false)
        }, 100)

        return () => {
            clearTimeout(timeout)
        }
    }, [career])

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginTop: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header />
            <Banner />
            {!reload ? <Roadmap data={data} /> : null}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})
