import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Platform,
    ScrollView,
} from 'react-native'
import React from 'react'
import Header from './mode/Header'
import Banner from './multi/Banner'
import Option from './multi/Option'

export default () => {
    const { width } = useWindowDimensions()
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
                        title="LE TOURNOI"
                        type="tournoi"
                        nbMax={6}
                        description="Avec tes amis, répondez chacun à une série de 5 questions, sous forme de QCM. Celui qui obtient le plus mauvais score est éliminé chaque tour. À jouer autour d'une table avec tes amis!"
                        color="#E0EBFF"
                        disabled={false}
                    />
                    <Option
                        title="LE CONTRE LA MONTRE"
                        type="montre"
                        nbMax={8}
                        description="Chaque joueur a une série de questions. Objectif : répondre au maximum de questions en 1min. Celui qui répond au plus grand nombre de questions gagne la partie!"
                        color="#BCD3FF"
                        disabled={false}
                    />
                    <Option
                        title="LA MORT SUBITE"
                        type="mort"
                        nbMax={8}
                        description="Chaque joueur aura une question. S'il répond correctement, le joueur suivant aura une question et ainsi de suite. Le joueur qui répond mal est éliminé. Le dernier joueur restant gagne la partie!"
                        color="#77A5FF"
                        disabled={false}
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
