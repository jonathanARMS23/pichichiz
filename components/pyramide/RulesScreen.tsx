import {
    View,
    Text,
    StyleSheet,
    Platform,
    useWindowDimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../utiles/constantes'
import CheckBox from '@react-native-community/checkbox'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'
import { useNavigation } from '@react-navigation/native'

interface IIProps {
    data: any
}

type PyramideNavProp = StackNavigationProp<RootStackParams>

const friendList = [
    {
        actif: true,
        name: 'Laulau4',
        pending: false,
        me: true,
    },
    {
        actif: true,
        name: 'ArnaudK',
        pending: true,
    },
    {
        actif: true,
        name: 'Jonathan',
        pending: true,
    },
]

const Item = ({ data }: IIProps) => {
    return (
        <View style={Style.item}>
            <View style={Style.player}>
                {data.me ? (
                    <Text
                        style={{ color: '#ffffff' }}
                    >{`${data.name}(moi)`}</Text>
                ) : (
                    <Text style={{ color: '#ffffff' }}>{`${data.name}`}</Text>
                )}
            </View>
            <View style={Style.statut}>
                {data.pending ? (
                    <ActivityIndicator
                        size="small"
                        color={COLORS.very_light_primary}
                    />
                ) : (
                    <CheckBox
                        value={true}
                        onCheckColor={Platform.OS === 'ios' ? '#ffffff' : ''}
                    />
                )}
            </View>
        </View>
    )
}

const TimeOut = () => {
    const navigation = useNavigation<PyramideNavProp>()
    const [count, setCount] = useState(3)
    useEffect(() => {
        const myTimeout = setInterval(() => {
            if (count > 1) {
                setCount(count - 1)
            } else {
                navigation.navigate('questionpour')
                clearInterval(myTimeout)
            }
        }, 1000)
    }, [count])

    return (
        <View style={Style.rebour}>
            <Text
                style={{
                    fontSize: 89,
                    fontWeight: 'bold',
                    color: '#ffffff',
                }}
            >
                {count}
            </Text>
        </View>
    )
}

export default () => {
    const { width } = useWindowDimensions()
    const [ready, setReady] = useState(false)
    return (
        <View
            style={{
                ...Style.container,
                marginVertical: Platform.OS === 'ios' ? 20 : 0,
            }}
        >
            <View style={Style.top}>
                <View style={Style.banner}>
                    <Image
                        source={require('../../assets/images/pyramide.png')}
                        style={{ width: 70, height: 70 }}
                    />
                    <Text
                        style={{
                            color: '#ffffff',
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        PYRAMIDE
                    </Text>
                </View>
                <View style={{ ...Style.rulesContainer, width: width }}>
                    <View style={Style.textRulesContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                            REGLES DU JEU :
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            Le jeu compte 10 questions.
                        </Text>
                        <Text>
                            Le temps est divisé en autant de partie qu'il y a de
                            joueurs. Le premier joueur joue sur les 5 premières
                            secondes et pour 8 points. S'il se trompe, le
                            deuxième joueur prend la suite pour 7 points, et
                            ainsi de suite.
                        </Text>
                        <Text>
                            Le{' '}
                            <Text style={{ fontWeight: 'bold' }}>gagnant</Text>{' '}
                            est celui qui aura le plus de points à l'issue des
                            10 questions.
                        </Text>
                    </View>
                </View>

                {ready ? (
                    <TimeOut />
                ) : (
                    <View style={Style.friendsContainer}>
                        <Text style={{ color: '#ffffff' }}>
                            En attente de tous tes amis ...
                        </Text>
                        <ScrollView>
                            {friendList.map((item, index) => (
                                <Item data={item} key={index} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
            {ready ? null : (
                <View style={Style.bottom}>
                    <View style={Style.checkBoxContainer}>
                        <CheckBox
                            value={ready}
                            onValueChange={(newValue) => setReady(newValue)}
                        />
                        <Text style={{ fontWeight: 'bold', marginRight: 20 }}>
                            JE SUIS PRET A JOUER !
                        </Text>
                    </View>
                    <TouchableOpacity style={Style.btn}>
                        <Text style={Style.quitter}>QUITTER</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    top: {
        flex: 2,
        alignItems: 'center',
    },
    banner: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rulesContainer: {
        backgroundColor: '#ffffff',
        minHeight: 200,
        maxHeight: 200,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 20,
    },
    textRulesContainer: {
        flex: 1,
        justifyContent: 'space-around',
        maxWidth: 370,
        minWidth: 370,
    },
    rebour: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    friendsContainer: {
        flex: 1,
        maxWidth: 370,
        minWidth: 370,
        paddingVertical: 15,
        marginTop: 15,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#ffffff',
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statut: {
        width: 30,
        height: 30,
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
