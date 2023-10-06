import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
    setScore,
    validateLevel,
    setHP,
    setCareer,
    setScoreOfLevel,
} from '../../store/reducers/user'
import { formatBonus, addBonusFact } from '../../services/factory/bonus'
import { addBonus, InitializeBonusState } from '../../store/reducers/bonus'
import {
    setPlayerScore,
    validateLevelInCareer,
    setPlayerHP,
    setUserCareer,
    saveUser,
    setLevelScore,
} from '../../services/factory/User'
import Header from './Finished/Header'
import Footer from './Finished/Footer'
import Result from './Finished/Result'
import Bonus from '../../services/store/Bonus'
import Solo from '../../services/store/Solo'
import HPStore from '../../services/store/HP'

interface IProps {
    level: number
    onPress: any
}

export default ({ level, onPress }: IProps) => {
    const dispatch = useDispatch()
    const info = useSelector((state: any) => state.game)
    const user = useSelector((state: any) => state.user)
    const reward = useSelector((state: any) => state.reward)
    const [wonbonus, setWonBonus] = useState<string | null>(null)
    const { width, height } = useWindowDimensions()

    const onFinished = async () => {
        try {
            const SoloAPI = new Solo()
            const index = user.career.findIndex((el: any) => el.level === level)
            if (index === -1) return
            const score =
                parseInt(`${user.career[index].score}`, 10) <=
                parseInt(`${info.note}`, 10)
                    ? parseInt(`${info.note}`, 10)
                    : parseInt(`${user.career[index].score}`, 10)
            if (info.note > 7) {
                // le score est validé
                dispatch(setScore(user.score + info.newScore)) // enregistrer le score dans le global state
                await setPlayerScore(user.score + info.newScore) // enregistrer le score dans l'ASyncStorage

                // won bonus ?
                const won =
                    reward.list.find(
                        (el: any) =>
                            parseInt(`${el.level}`, 10) ===
                                parseInt(`${level}`, 10) && el.type === 'bonus'
                    ) && !user.career.find((el: any) => el.level > level)

                if (user.id) {
                    const BonusAPI = new Bonus()
                    // sauvegarder le score du level
                    const result = await SoloAPI.updateSolo({
                        level,
                        score,
                        user_id: user.id,
                    })
                    if (!result.canceled) {
                        if (user.career.length < level + 1) {
                            // sauvegarde du niveau débloquer
                            const response = await SoloAPI.create({
                                level: level + 1,
                                score: 0,
                                user_id: user.id,
                            })
                            if (!response.canceled && Array.isArray(response)) {
                                dispatch(setCareer(response))
                                // await setUserCareer(response)
                            }
                        } else {
                            dispatch(setScoreOfLevel({ level, score }))
                        }
                    }

                    // won bonus ?
                    /** const won = reward.list.find(
                        (el: any) =>
                            parseInt(`${el.level}`, 10) ===
                                parseInt(`${level}`, 10) && el.type === 'bonus'
                    ) */
                    if (won) {
                        console.log(`tu as gagné un bonus: ${won.name}`)
                        setWonBonus(won.name)
                        const response = await BonusAPI.wonBonus({
                            nom: won.name,
                            quantity: won.quantity,
                            user_id: user.id,
                        })
                        if (!response.canceled && Array.isArray(response)) {
                            // chargement dans le global state "bonus"
                            dispatch(
                                InitializeBonusState({
                                    list: formatBonus(response),
                                })
                            )
                        }
                    }
                } else {
                    // niveau debloquer
                    dispatch(
                        validateLevel({
                            level,
                            score: info.note,
                            unlocked: level + 1,
                        })
                    )
                    await validateLevelInCareer(level, info.note, level + 1)
                    // delivred bonus
                    if (won) {
                        console.log(`tu as gagné un bonus: ${won.name}`)
                        setWonBonus(won.name)
                        // sauvegarde
                        const isHaded = await addBonusFact({
                            nom: won.name,
                            count: won.quantity,
                        })
                        console.log(`did bonus haded: ${isHaded}`)
                        // dispatch
                        dispatch(
                            addBonus({ nom: won.name, count: won.quantity })
                        )
                    }
                }
            } else {
                // eslint-disable-next-line no-lonely-if
                if (user.id) {
                    /** const score =
                        parseInt(`${user.career[level - 1].score}`, 10) <=
                        parseInt(`${info.note}`, 10)
                            ? parseInt(`${info.note}`, 10)
                            : parseInt(`${user.career[level - 1].score}`, 10) */
                    // le hp diminue
                    const result = await SoloAPI.updateSolo({
                        level,
                        score,
                        user_id: user.id,
                    })
                    if (!result.canceled) {
                        const API = new HPStore()
                        if (user.career.length < level + 1) {
                            const response = await API.substractHP(user.id, 1)
                            if (!response.canceled) {
                                dispatch(setHP(response))
                                await setPlayerHP(response)
                                const getCareer = await SoloAPI.get(user.id)
                                if (!getCareer.canceled) {
                                    await saveUser({
                                        ...user,
                                        hp: response,
                                        career: getCareer,
                                    })
                                    dispatch(setCareer(getCareer))
                                    await setUserCareer(getCareer)
                                }
                            }
                        }
                    }
                } else {
                    if (user.career.length < level + 1) {
                        dispatch(setHP(user.hp - 1))
                        await setPlayerHP(user.hp - 1)
                    }
                    /** const score =
                        parseInt(`${user.career[level - 1].score}`, 10) <=
                        parseInt(`${info.note}`, 10)
                            ? parseInt(`${info.note}`, 10)
                            : parseInt(`${user.career[level - 1].score}`, 10) */
                    dispatch(
                        setScoreOfLevel({
                            level,
                            score,
                        })
                    )
                    await setLevelScore(level, score)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            await onFinished()
        })()
    }, [])

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
                maxWidth: width,
                minHeight: height,
                maxHeight: height,
            }}
        >
            <Header level={level} />
            <Result rate={info.note} level={level} bonus={wonbonus} />
            <Footer rate={info.note} onPress={onPress} />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1B2444',
    },
})
