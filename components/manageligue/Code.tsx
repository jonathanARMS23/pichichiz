import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'

type MLigueNavProp = StackNavigationProp<RootStackParams, 'manageligue'>

interface IProps {
    code: string
}

export default ({ code }: IProps) => {
    const { height } = useWindowDimensions()
    const navigation = useNavigation<MLigueNavProp>()

    const onCreate = async () => {
        navigation.navigate('ligue')
    }

    return (
        <View style={Style.screen}>
            <View
                style={{
                    ...Style.container,
                    maxHeight: height - 250,
                    minHeight: height - 250,
                }}
            >
                <View style={Style.notifContainer}>
                    <View style={Style.titleContainer}>
                        <Text style={Style.title}>MEMBRE DE LA LIGUE</Text>
                    </View>
                    <View style={Style.notification}>
                        <Icon
                            name="checkmark-outline"
                            height={30}
                            width={30}
                            fill="#1B2444"
                        />
                        <Text style={Style.notificationText}>
                            Les invitations ont bien été envoyés à tes amis.
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Tu peux aussi leur partager ce code pour les inviter
                            à la ligue FBDB.
                        </Text>
                    </View>
                </View>
                <View style={Style.stack}>
                    <View>
                        <Text>
                            Partage ce code aux utilisateurs que tu souhaites
                            intégrer à cette ligue.
                        </Text>
                    </View>
                    <View style={Style.codeContainer}>
                        <Text style={Style.code}>
                            {code.toLocaleUpperCase()}
                        </Text>
                    </View>
                    <View></View>
                </View>
                <View>
                    <Text>
                        Merci de patienter, tu pourras commencer la ligue quand
                        tout le monde aura accepté l’invitation à rejoindre la
                        ligue.
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    minWidth: 375,
                    maxWidth: 375,
                    minHeight: 60,
                    maxHeight: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...Style.buttonAdd,
                        borderWidth: 1,
                        borderColor: '#1B2444',
                    }}
                    onPress={onCreate}
                >
                    <Text
                        style={{ ...Style.buttonAddText, color: '#1B2444' }}
                    >{`  OK`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    notifContainer: {
        maxHeight: 200,
        minHeight: 200,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
        marginVertical: 5,
    },
    title: {
        fontWeight: 'bold',
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 194,
        maxWidth: 194,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    notification: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        backgroundColor: '#31CCC0',
    },
    notificationText: {
        color: '#1B2444',
        fontWeight: 'bold',
    },
    stack: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 190,
        maxHeight: 190,
        backgroundColor: '#EBECF0',
        paddingHorizontal: 10,
    },
    codeContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minWidth: 333,
        maxWidth: 333,
        minHeight: 60,
        maxHeight: 60,
        backgroundColor: '#FFFFFF',
    },
    code: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B2444',
    },
})
