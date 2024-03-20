import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Platform,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../../mode/Header'
import Banner from './banner'
import MainContent from './mainContent'
import Calendar from './calendar'
import Classement from './classement'
import Footer from './footer'
import { RootStackParams } from '../../../navigation/tool/tool'
import { RouteProp, useRoute } from '@react-navigation/native'

type ligueGameProp = RouteProp<RootStackParams, 'liguegame'>

const fakedata = {
    code: 'Z3JFOOC',
    created_at: '2024-02-01T03:30:09.135Z',
    difficulty: 7,
    duration: 3,
    id: 1,
    name: 'TEST',
    participant: 10,
}

export default () => {
    const { width } = useWindowDimensions()
    const routeProp = useRoute<ligueGameProp>()
    const [screen, setScreen] = useState(1)
    // const data = routeProp.params.data
    console.log('data ligue game: ', fakedata)

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginVertical: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header />
            <Banner />
            {screen === 1 && <MainContent setScreen={setScreen} />}
            {screen === 2 && <Calendar />}
            {screen === 3 && <Classement />}
            <Footer setScreen={setScreen} screen={screen} />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
})
