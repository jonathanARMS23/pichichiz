import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    useWindowDimensions,
    Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useAppSelector } from '../store/hooks/hooks'
import { RootStackParams } from '../navigation/tool/tool'
import Option from './online/Option'
import Banner from './online/Banner'
import Header from './mode/Header'

type OnlineNavProp = StackNavigationProp<RootStackParams, 'room'>

export default () => {
    const { width } = useWindowDimensions()
    const user = useAppSelector((state) => state.user)
    const mode = useAppSelector((state) => state.mode)
    const navigation = useNavigation<OnlineNavProp>()

    useEffect(() => {
        if (!user.id) {
            navigation.navigate('noaccess')
        }
    }, [user])

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
            <ScrollView>
                <View style={Style.optionContainer}>
                    <Option
                        title="DUEL"
                        type="duel"
                        subtitle="Lance un duel à un ami !"
                        description="Vous vous affronterez sur 5 séries de 5 questions. Que le meilleur gagne !"
                        color="#FFDFC8"
                        disabled={!mode.duelaccess}
                    />
                    <Option
                        title="LIGUE"
                        type="ligue"
                        subtitle="Rejoins une ligue et affronte tes adversaires."
                        description="Tu peux aussi créer ta propre ligue ! Qui vas-tu prendre dans ton équipe ?"
                        color="#FFC085"
                        disabled={true}
                    />
                    <Option
                        title="PYRAMIDE"
                        type="pyramide"
                        subtitle=""
                        description="Joue avec tes amis à une série de questions. Le temps et les points sont sous forme de pyramide. Vas-tu t’en sortir ?"
                        color="#FFE09E"
                        disabled={true}
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
