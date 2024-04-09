/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    BackHandler,
    Platform,
} from 'react-native'
// import { useSelector } from 'react-redux'
import { InitializeBonusState } from '../store/reducers/bonus'
import { setCareer, setHP } from '../store/reducers/user'
// import { IState } from '../store/configureStore'
import {
    InitializeBonus,
    getBonus,
    formatBonus,
} from '../services/factory/bonus'
import { setInit } from '../store/reducers/dailyBonus'
import { setDuelAccess } from '../store/reducers/mode'
import { useAppSelector, useAppDispatch } from '../store/hooks/hooks'
import Option from './main/Option'
import User from './main/User'
import Header from './sous-components/Header'
import Socket from '../services/socket/socket'
import Bonus from '../services/store/Bonus'
import DailyBonusStore from '../services/store/daily_bonus'
import Solo from '../services/store/Solo'
import HPStore from '../services/store/HP'
import DailyBonus from './dailybonus/dailyBonus'
import { COLORS } from '../utiles/constantes'

export default () => {
    const dailyBonus = useAppSelector((state) => state.dailybonus)
    const Dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user)
    const { pseudo, career } = user
    const { level } = career[career.length - 1]

    // empêcher le retour en arrière
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => true)
        }
    }, [])

    // fonction pour charger le parcour du joueur connecté
    const InitUserCareer = async (user_id: number): Promise<Array<any>> => {
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

    // initialisation de bonus
    useEffect(() => {
        const DailyBonusAPI = new DailyBonusStore()
        const API = new Bonus()
        let isSubscribe = true
        ;(async () => {
            if (isSubscribe) {
                let bonus: any = []
                // si un utilisateur est connecté on récupère ses bonus dans la base
                if (user.id) {
                    let bonusList: Array<any>
                    const response = await API.getUserBonus(
                        parseInt(`${user.id}`, 10)
                    )
                    if (!response.canceled && Array.isArray(response)) {
                        bonusList = response
                        if (response.length === 0) {
                            const result = await API.initBonus(
                                parseInt(`${user.id}`, 10)
                            )
                            if (!result.canceled && Array.isArray(result))
                                bonusList = result
                            bonus = formatBonus(bonusList)
                        } else bonus = formatBonus(response)
                    }
                    console.log('initialisation de bonus en ligne')
                    console.log(bonus)
                    // load hp
                    const loaded_hp = await InitHP(parseInt(`${user.id}`, 10))
                    Dispatch(setHP(loaded_hp))
                    // career confirmation
                    const loaded_career = await InitUserCareer(
                        parseInt(`${user.id}`, 10)
                    )
                    Dispatch(setCareer(loaded_career))
                    Dispatch(setDuelAccess(loaded_career.length))
                    // sinon on charge les bonus du local data

                    // initialisation daily bonus
                    const result = await DailyBonusAPI.Init(
                        parseInt(`${user.id}`, 10)
                    )

                    if (result && result.id) Dispatch(setInit(true))
                } else {
                    bonus = await getBonus()
                    if (!bonus) {
                        await InitializeBonus()
                        bonus = await getBonus()
                    }
                }

                // chargement dans le global state "bonus"
                Dispatch(
                    InitializeBonusState({
                        list: bonus,
                    })
                )
            }
        })()

        return () => {
            API.Cancel()
            DailyBonusAPI.Cancel()
            isSubscribe = false
        }
    }, [])

    // connexion au serveur socket
    useEffect(() => {
        const onConnect = () => {
            console.log('connected')
        }
        Socket.on('connect', onConnect)
        Socket.emit('launch', user)

        return () => {
            Socket.off('connect', onConnect)
        }
    }, [])

    return (
        <View
            style={{
                ...Style.container,
                paddingTop: Platform.OS === 'ios' ? 25 : 0,
            }}
        >
            {dailyBonus.init && <DailyBonus show={true} />}
            <ScrollView>
                <Header />
                <User pseudo={pseudo} />
                <View style={Style.optionContainer}>
                    <Option
                        title="MODE SOLO"
                        type="solo"
                        description="Trouve les bonnes réponses pour progresser dans les centaines de niveaux à débloquer !"
                        levelValue={`${level}/400`}
                        color="#85E9E1"
                        scoreColor="#31CCC0"
                        iconColor="#31CCC0"
                        level
                    />
                    <Option
                        title="MODE MULTI-JOUEURS"
                        type="multi"
                        description="3 jeux différents pour ce mode de jeu. À jouer sans modération avec tous tes amis !"
                        levelValue=""
                        color="#91AFEC"
                        scoreColor="#375DAB"
                        iconColor="#375DAB"
                        // disabled
                    />
                    <Option
                        title="MODE EN LIGNE"
                        type="online"
                        description="Lance un duel avec ton ami, créer ou rejoins une ligue, et relève le défi de la pyramide !"
                        levelValue=""
                        color="#FFE4CF"
                        scoreColor="#FFD6B7"
                        iconColor="#FFD6B7"
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
    },
    optionContainer: {
        flex: 1,
        alignItems: 'center',
    },
})
