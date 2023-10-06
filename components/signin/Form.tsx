import React, { useState } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import { setUser } from '../../store/reducers/user'
import {
    getPlayerScore,
    setPlayerScore,
    // getPlayerHP,
    // setPlayerHP,
    saveUser,
} from '../../services/factory/User'
import Input from '../sous-components/Input'
import OAuth from '../../services/store/OAuth'
import Solo from '../../services/store/Solo'
import HPStore from '../../services/store/HP'

type FormNav = StackNavigationProp<RootStackParams>

export default () => {
    const navigation = useNavigation<FormNav>()
    const Dispatch = useDispatch()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const clear = () => {
        setMail('')
        setPassword('')
    }

    // fonction pour charger le parcour du joueur connecté
    const InitUserCareer = async (user_id: number) => {
        const API = new Solo()
        const response = await API.get(user_id)
        if (!response.canceled && Array.isArray(response)) {
            if (response.length === 0) {
                const data = {
                    level: 1,
                    score: 0,
                    user_id,
                }
                const result = await API.create(data)
                if (!result.canceled) return result
            }
            return response
        }
        return []
    }

    const InitHP = async (user_id: number) => {
        const API = new HPStore()
        const response = await API.getHP(user_id)
        if (!response.canceled) return response

        return 1
    }

    const onSignin = async () => {
        try {
            setLoading(true)
            const API = new OAuth()
            const data = await API.InitKey()
            const { token } = data
            if (token) {
                const response = await API.Signin(mail, password, token)
                if (!response.canceled) {
                    // verification du score du joueur
                    let score = await getPlayerScore()
                    if (!score) {
                        await setPlayerScore(0)
                        score = await getPlayerScore()
                    }

                    // verification du HP
                    const hp = await InitHP(parseInt(`${response.user_id}`, 10))
                    /** if (!hp) {
                        await setPlayerHP(10)
                        hp = await getPlayerHP()
                    } */

                    // career initialisation
                    const career = await InitUserCareer(
                        parseInt(`${response.user_id}`, 10)
                    )

                    // charger le state global "user"
                    Dispatch(
                        setUser({
                            id: response.user_id,
                            nom: '',
                            prenom: '',
                            pseudo: response.pseudo,
                            email: mail,
                            phone: response.phone,
                            hp,
                            score,
                            career,
                        })
                    )

                    // enregistrement du joueur dans le stockage local
                    await saveUser({
                        id: response.user_id,
                        nom: '',
                        prenom: '',
                        pseudo: response.pseudo,
                        email: mail,
                        phone: response.phone,
                        hp,
                        score,
                        career,
                    })

                    // nettoyage
                    clear() // des inputs
                    API.Cancel() // de l'abonnement API
                    setLoading(false)
                    // redirection
                    navigation.navigate('room', { screen: 'main' })
                } else {
                    const timeout = setTimeout(() => {
                        setLoading(false)
                        clearTimeout(timeout)
                    }, 2000)
                }
            } else {
                const timeout = setTimeout(() => {
                    setLoading(false)
                    clearTimeout(timeout)
                }, 2000)
            }
        } catch (error) {
            console.log(error)

            const timeout = setTimeout(() => {
                setLoading(false)
                clearTimeout(timeout)
            }, 2000)
        }
    }

    return (
        <View style={Style.container}>
            <View style={Style.form}>
                <Input
                    label
                    icon
                    required
                    iconName="at-outline"
                    labelText="Adresse mail"
                    placeholder="exemple@gmail.com"
                    width={375}
                    value={mail}
                    onChangeText={setMail}
                    secure={false}
                />
                <Input
                    label
                    icon
                    required
                    iconName="unlock-outline"
                    labelText="Mot de passe"
                    placeholder="minimum 8 caractères"
                    width={375}
                    value={password}
                    onChangeText={setPassword}
                    secure={true}
                />
            </View>
            {loading ? (
                <View style={Style.loading}>
                    <ActivityIndicator size="small" color="#1B2444" />
                </View>
            ) : (
                <TouchableOpacity style={Style.button} onPress={onSignin}>
                    <Text>Se connecter</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#1B2444',
        borderWidth: 1,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
    },
})
