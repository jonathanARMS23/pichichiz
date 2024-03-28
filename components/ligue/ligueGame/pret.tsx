import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    ActivityIndicator,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { COLORS } from '../../../utiles/constantes'
import { color } from '@rneui/base'
import { MainStackParams } from '../../../navigation/tool/tool'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

type ligueNavProp = StackNavigationProp<MainStackParams>

export default () => {
    const [value, setValue] = useState(false)
    const { width } = useWindowDimensions()
    const navigation = useNavigation<ligueNavProp>()
    const quitter = () => {
        navigation.navigate('liguegame') //mety
    }
    return (
        <View
            style={{
                ...Style.container,
                marginVertical: Platform.OS === 'ios' ? 20 : 0,
            }}
        >
            <View style={Style.top}>
                <View style={{ ...Style.banner }}>
                    <Image
                        source={require('../../../assets/images/ligue.png')}
                    />
                    <Text style={{ color: '#ffffff', marginTop: 5 }}>
                        LIGUE
                    </Text>
                </View>
                <View style={Style.ligueInfo}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: COLORS.light_primary,
                        }}
                    >
                        DUEL LIGUE SPORT360°
                    </Text>
                    <View style={Style.duel}>
                        <Text style={{ color: '#ffffff' }}>Laulau4(moi)</Text>
                        <Text
                            style={{
                                fontSize: 17,
                                color: COLORS.red,
                                fontWeight: 'bold',
                            }}
                        >
                            VS
                        </Text>
                        <Text style={{ color: '#ffffff' }}>ArnaudK</Text>
                    </View>
                </View>
                <View style={{ ...Style.infoText, width: width }}>
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontStyle: 'italic',
                            paddingHorizontal: 10,
                        }}
                    >
                        Affronte ton adversaire sur 3 séries de 10 questions.
                        Celui qui gagne le plus de série remporte le duel.
                    </Text>
                </View>
                <View style={Style.series}>
                    <Text style={{ color: '#ffffff' }}>SERIES</Text>
                    <View style={Style.levelContainer}>
                        <Text style={Style.level}>1</Text>
                        <Text style={Style.level}>2</Text>
                        <Text style={Style.level}>3</Text>
                    </View>
                </View>
                <View style={Style.loading}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.light_primary}
                    />
                    <Text
                        style={{
                            color: COLORS.light_primary,
                            fontSize: 17,
                            marginTop: 10,
                        }}
                    >
                        CHARGEMENT
                    </Text>
                </View>
            </View>
            <View style={Style.bottom}>
                <View style={Style.checkBoxContainer}>
                    <CheckBox
                        value={value}
                        onValueChange={(newValue) => setValue(newValue)}
                    />
                    <Text style={{ fontWeight: 'bold', marginRight: 20 }}>
                        JE SUIS PRET A JOUER !
                    </Text>
                </View>
                <TouchableOpacity style={Style.btn} onPress={quitter}>
                    <Text style={Style.quitter}>QUITTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(27, 36, 68, 1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
    },
    top: {
        flex: 1,
        alignItems: 'center',
    },

    banner: {
        alignItems: 'center',
    },
    ligueInfo: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    duel: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    infoText: {
        height: 60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    series: {
        height: 100,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    level: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.light_primary,
        color: COLORS.primary,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        minHeight: 100,
        maxHeight: 100,
        minWidth: 250,
        maxWidth: 250,
    },
    checkBoxContainer: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quitter: {
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})
