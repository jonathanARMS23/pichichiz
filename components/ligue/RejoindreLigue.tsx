import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Platform,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../mode/Header'
import { COLORS } from '../../utiles/constantes'
import { TextInput } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import { useNavigation } from '@react-navigation/native'

type LigueNavProp = StackNavigationProp<RootStackParams, 'ligue'>

export default () => {
    const { width } = useWindowDimensions()
    const [code, setCode] = useState('')
    const navigation = useNavigation<LigueNavProp>()
    const valider = () => {
        navigation.navigate('confirmrejoindre', { code: code })
    }
    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                marginVertical: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            <Header />
            <View style={{ ...Style.bannerContainer, width: width }}>
                <View style={Style.imageWrapper}>
                    <Text style={{ fontWeight: 'bold' }}>
                        REJOINDRE UNE LIGUE
                    </Text>
                </View>
            </View>
            <View style={{ ...Style.infoContainer, minWidth: width }}>
                <View style={Style.info}>
                    <Text>
                        {' '}
                        Pour{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                            rejoindre une ligue
                        </Text>
                        , tu dois entrer le{' '}
                        <Text style={{ fontWeight: 'bold' }}>code</Text> qu'un
                        membre de la ligue t'aura partagé
                    </Text>
                </View>
            </View>
            <View style={{ ...Style.codeContainer, width: width }}>
                <View style={Style.codeSection}>
                    <Text style={{ fontWeight: 'bold' }}>Entrer le code :</Text>
                    <TextInput
                        value={code}
                        onChangeText={(text) => setCode(text)}
                        style={{
                            ...Style.inputCode,
                        }}
                    />
                    <Text
                        style={{
                            fontStyle: 'italic',
                            alignSelf: 'center',
                        }}
                    >
                        ex: YEDNKI6
                    </Text>
                </View>
            </View>
            <View style={{ ...Style.btnContainer, width: width }}>
                <TouchableOpacity style={Style.btnValider} onPress={valider}>
                    <Text
                        style={{ color: COLORS.primary, fontSize: 15 }}
                    >{`VALIDER`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 200,
        maxWidth: 200,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFC085',
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 55,
        maxHeight: 55,
        marginTop: 15,
    },
    info: {
        flex: 1,
        backgroundColor: COLORS.very_light_primary,
        minWidth: 320,
        maxWidth: 320,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    codeContainer: {
        marginTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    codeSection: {
        justifyContent: 'space-between',
        minWidth: 320,
        maxWidth: 320,
        minHeight: 110,
        maxHeight: 110,
    },
    inputCode: {
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: COLORS.primary,
    },
    btnContainer: {
        flex: 1,
        minHeight: 45,
        maxHeight: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    btnValider: {
        flex: 1,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
})
