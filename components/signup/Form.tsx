import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
    useWindowDimensions,
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
import {
    verifyEmail,
    verifyName,
    verifyTel,
} from '../../services/factory/OAuth'
import Input from '../sous-components/Input'
import OAuth from '../../services/store/OAuth'
import Solo from '../../services/store/Solo'
import HPStore from '../../services/store/HP'
import ErrorModal from './ErrorModal'

type SignupNav = StackNavigationProp<RootStackParams, 'signup'>

const ErrorMap = new Map()

export default () => {
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation<SignupNav>()
    const Dispatch = useDispatch()
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)

    const clear = () => {
        setPrenom('')
        setNom('')
        setPseudo('')
        setMail('')
        setPassword('')
    }

    // fonction pour charger le parcour solo du joueur
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

    const checkInputs = () => {
        setError(false)
        ErrorMap.clear()
        if (!verifyName(nom))
            ErrorMap.set('Nom', `Saisissez un nom valide s'il vous plait`)
        if (!verifyName(prenom))
            ErrorMap.set('Prenom', `Saisissez un prénom valide s'il vous plait`)
        if (!verifyEmail(mail))
            ErrorMap.set('Email', `Saisissez un email valide s'il vous plait`)
        if (!verifyTel(phone))
            ErrorMap.set(
                'Phone',
                `Saisissez un numéro de téléphone valide s'il vous plait`
            )
    }

    const onSignup = async () => {
        try {
            setLoading(true)
            checkInputs()
            const API = new OAuth()
            const data = await API.InitKey()
            const { token } = data
            if (token && ErrorMap.size === 0) {
                const response = await API.Signup(
                    pseudo,
                    mail,
                    password,
                    phone,
                    token
                )
                if (!response.canceled) {
                    // chargement du score
                    let score = await getPlayerScore()
                    if (!score) {
                        await setPlayerScore(0)
                        score = await getPlayerScore()
                    }

                    // chargement du HP
                    const hp = await InitHP(parseInt(`${response}`, 10))
                    /** if (!hp) {
                        await setPlayerHP(10)
                        hp = await getPlayerHP()
                    } */

                    // career initialisation
                    const career = await InitUserCareer(
                        parseInt(`${response}`, 10)
                    )

                    // chargement du state global "user"
                    Dispatch(
                        setUser({
                            id: response,
                            nom,
                            prenom,
                            pseudo,
                            email: mail,
                            phone,
                            hp,
                            score,
                            career,
                        })
                    )
                    // enregistrement dans le stockage local
                    await saveUser({
                        id: response,
                        nom,
                        prenom,
                        pseudo,
                        email: mail,
                        phone,
                        hp,
                        score,
                        career,
                    })

                    // nettoyage
                    clear() // des inputs
                    API.Cancel() // de l'abonnement à l'API
                    setLoading(false)

                    // redirection
                    navigation.navigate('confirmation')
                } else {
                    const timeout = setTimeout(() => {
                        setLoading(false)
                        clearTimeout(timeout)
                    }, 2000)
                }
            } else {
                setError(true)
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

    const onClose = () => {
        setError(false)
        ErrorMap.clear()
    }

    return (
        <View style={Style.container}>
            <View style={Style.form}>
                <View style={Style.name}>
                    <Input
                        label
                        icon={false}
                        required
                        iconName="at-outline"
                        labelText="Prénom"
                        placeholder="John"
                        width={180}
                        value={prenom}
                        onChangeText={setPrenom}
                        secure={false}
                    />
                    <Input
                        label
                        icon={false}
                        required
                        iconName="at-outline"
                        labelText="Nom"
                        placeholder="Doe"
                        width={180}
                        value={nom}
                        onChangeText={setNom}
                        secure={false}
                    />
                </View>
                <Input
                    label
                    icon={false}
                    required
                    iconName="at-outline"
                    labelText="Pseudo"
                    placeholder="JohnDoe"
                    width={375}
                    value={pseudo}
                    onChangeText={setPseudo}
                    secure={false}
                />
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
                    icon={false}
                    required
                    iconName="at-outline"
                    labelText="Téléphone"
                    placeholder="tel"
                    width={375}
                    value={phone}
                    onChangeText={setPhone}
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
                    secure
                />
            </View>
            {loading ? (
                <View style={Style.loading}>
                    <ActivityIndicator size="small" color="#1B2444" />
                </View>
            ) : (
                <TouchableOpacity style={Style.button} onPress={onSignup}>
                    <Text style={Style.darkButtonText}>Créer un compte</Text>
                </TouchableOpacity>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={hasError}
                onRequestClose={onClose}
            >
                <View
                    style={{
                        ...Style.modal,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <ErrorModal
                        nom={hasError ? ErrorMap.has('Nom') : false}
                        prenom={hasError ? ErrorMap.has('Prenom') : false}
                        email={hasError ? ErrorMap.has('Email') : false}
                        tel={hasError ? ErrorMap.has('Phone') : false}
                        onPress={onClose}
                    />
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 500,
    },
    form: {
        flex: 1,
        minWidth: 375,
        maxWidth: 375,
        alignItems: 'center',
    },
    name: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 70,
        maxHeight: 70,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#1B2444',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        marginTop: 5,
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
    darkButtonText: {
        color: '#FFFFFF',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
})
