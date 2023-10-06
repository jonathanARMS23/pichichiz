import React, { useEffect } from 'react'
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/tool/tool'
import { IState } from '../store/configureStore'
import Option from './online/Option'
import Banner from './online/Banner'
import Header from './mode/Header'

type OnlineNavProp = StackNavigationProp<RootStackParams, 'room'>

export default () => {
    const { width } = useWindowDimensions()
    const user = useSelector((state: IState) => state.user)
    const navigation = useNavigation<OnlineNavProp>()

    useEffect(() => {
        if (!user.id) {
            navigation.navigate('noaccess')
        }
    }, [user])

    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <Header />
            <Banner />
            <ScrollView>
                <View style={Style.optionContainer}>
                    <Option
                        title="DUEL"
                        type="duel"
                        subtitle="Lance un duel à un ami !"
                        description="Vous vous affronterez sur 5 séries de 5 questions. Que le meilleur gagne !"
                        color="#FFDFC8"
                    />
                    <Option
                        title="LIGUE"
                        type="ligue"
                        subtitle="Rejoins une ligue et affronte tes adversaires."
                        description="Tu peux aussi créer ta propre ligue ! Qui vas-tu prendre dans ton équipe ?"
                        color="#FFC085"
                        disabled
                    />
                    <Option
                        title="PYRAMIDE"
                        type="pyramide"
                        subtitle=""
                        description="Joue avec tes amis à une série de questions. Le temps et les points sont sous forme de pyramide. Vas-tu t’en sortir ?"
                        color="#FFE09E"
                        disabled
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    optionContainer: {
        flex: 1,
        alignItems: 'center',
    },
})
