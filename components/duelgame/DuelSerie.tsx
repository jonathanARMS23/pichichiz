/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react'
import SerieQuestionStore, {
    Validation,
} from '../../services/store/SerieQuestion'
import { useAppSelector, useAppDispatch } from '../../store/hooks/hooks'
import SerieStore, { Type } from '../../services/store/Serie'
import socket from '../../services/socket/socket'
import {
    SetScorePlayer1,
    SetScorePlayer2,
    SetScore2,
    SetScore1,
} from '../../store/reducers/duel'
import Quizz from './Quizz'
import DuelStore from '../../services/store/Duel'
import Finished from './Finished'
import Loading from './Loading'
import Error from './Error'

interface IProps {
    level: number
    steps: number
    vs: string
}

export default ({ level, steps, vs }: IProps) => {
    const Dispatch = useAppDispatch()
    const Duel = useAppSelector((state) => state.duel)
    const User = useAppSelector((state) => state.user)
    const [saved, setSaved] = useState(false)
    const [player, setPlayer] = useState(1)
    const [questions, setQuestions] = useState<Array<any>>([])
    const [step1, setStep1] = useState<any>(null)
    const [step2, setStep2] = useState<any>(null)
    const [step3, setStep3] = useState<any>(null)
    const [step4, setStep4] = useState<any>(null)
    const [step5, setStep5] = useState<any>(null)
    const [step, setStep] = useState(parseInt(`${steps}`, 10))
    const [finished, setFinished] = useState(false) // duel is finished ?
    const [equal, setEqual] = useState(false)
    const [error, setError] = useState(false)

    /**
     * chargement des questions:
     * dépendance:
     * level: lié au numéro de la série et définie la difficulté des questions
     */

    // get all questions
    useEffect(() => {
        // user verification
        const person =
            parseInt(`${User.id}`, 10) === parseInt(`${Duel.id_player1}`, 10)
                ? 1
                : 2
        console.log(`joueur n°${person}`)
        setPlayer(person)
        // get questions
        const API = new SerieStore()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.GetQuestions(Duel.id_serie)
                console.log(response)
                if (
                    response &&
                    response.data &&
                    Array.isArray(response.data) &&
                    response.data.length === 5
                ) {
                    const questionsData = response.data
                    setQuestions(questionsData)
                    setStep1(questionsData[0])
                    setStep2(questionsData[1])
                    setStep3(questionsData[2])
                    setStep4(questionsData[3])
                    setStep5(questionsData[4])
                    setSaved(response.saved)
                } else setError(true)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // fin du chargement

    const GetQuestionData = (indice: number) => {
        switch (indice) {
            case 0:
                return step1
            case 1:
                return step2
            case 2:
                return step3
            case 3:
                return step4
            case 4:
                return step5
            default:
                return step1
        }
    }

    // fonction appelé par le bouton "suivant"
    // valid défini si la question a été correctement répondu ou non
    const onNext = async (valid: boolean) => {
        if (!saved) {
            console.log('lanceur')
            console.log(`validation: ${valid}`)
            const API = new SerieQuestionStore()
            const SAPI = new SerieStore()
            const question = GetQuestionData(step)
            let newstep = step
            console.log({
                id_serie: parseInt(`${Duel.id_serie}`, 10),
                id_question: question.quizz_id,
                id_reponse: question.quizz_response,
                model: question.quizz_question,
                difficulty: level,
                player_1:
                    player === 1
                        ? valid
                            ? Validation.VALIDE
                            : Validation.RATER
                        : undefined,
                player_2:
                    player === 2
                        ? valid
                            ? Validation.VALIDE
                            : Validation.RATER
                        : undefined,
            })
            if (!Duel.id_serie || !question.quizz_id) setError(true)
            else {
                // enregistrement de la question
                const response = await API.Create({
                    id_serie: parseInt(`${Duel.id_serie}`, 10),
                    id_question: question.quizz_id,
                    id_reponse: question.quizz_response,
                    model: question.quizz_question,
                    difficulty: level,
                    player_1:
                        player === 1
                            ? valid
                                ? Validation.VALIDE
                                : Validation.RATER
                            : undefined,
                    player_2:
                        player === 2
                            ? valid
                                ? Validation.VALIDE
                                : Validation.RATER
                            : undefined,
                })
                console.log(`creation question serie: ${response}`)

                if (response) {
                    // si l'enregistrement de la question fut un succès augmenter le score d'un point
                    if (valid)
                        Dispatch(
                            player === 1
                                ? SetScorePlayer1(1)
                                : SetScorePlayer2(1)
                        )

                    if (step < 4) {
                        newstep++
                        setStep(newstep)
                    }

                    if (step === 4) {
                        // récupérer le nombre de question validé pour définir le score final
                        const SQ_response = await API.GetValidatedCount(
                            parseInt(`${Duel.id_serie}`, 10),
                            player
                        )
                        if (!SQ_response.canceled) {
                            // vérifier si les données coincide
                            const playerScore =
                                player === 1
                                    ? parseInt(`${Duel.score_player1}`, 10)
                                    : parseInt(`${Duel.score_player2}`, 10)
                            if (parseInt(`${SQ_response}`, 10) !== playerScore)
                                Dispatch(
                                    player === 1
                                        ? SetScore1(
                                              parseInt(`${SQ_response}`, 10)
                                          )
                                        : SetScore2(
                                              parseInt(`${SQ_response}`, 10)
                                          )
                                )

                            // enregistrement du score dans la base de données
                            const S_response = await SAPI.SetScore(
                                parseInt(`${Duel.id_serie}`, 10),
                                player,
                                SQ_response
                            )
                            if (!S_response.canceled) {
                                console.log(`score saved: ${SQ_response}`)
                                // envoie du notification de fin de série
                                socket.emit(`onFinishSerie`, {
                                    id_duel: Duel.id_duel,
                                    user_id:
                                        player === 1
                                            ? Duel.id_player2
                                            : Duel.id_player1,
                                    id_serie: Duel.id_serie,
                                })
                                newstep++
                                setStep(newstep)
                            } else setError(true)
                        } else setError(true)
                    }
                } else setError(true)
            }
        } else {
            console.log('second')
            console.log(`validation: ${valid}`)
            const API = new SerieQuestionStore()
            const SAPI = new SerieStore()
            const DAPI = new DuelStore()
            // enregistrement de la validation de la question
            const question = GetQuestionData(step) // récupérer la question
            let newstep = step
            // récupérer des données de la question pour avoir l'id_serie_question
            const serie_queston = questions.find(
                (el: any) => `${el.id_question}` === `${question.quizz_id}`
            )
            // enregistrement dans la base
            const response = await API.SetValidation({
                id_serie_question: serie_queston.id_serie_question,
                player,
                validation: valid ? Validation.VALIDE : Validation.RATER,
            })
            console.log(`creation question serie: ${response}`)
            if (!response.canceled) {
                // si l'enregistrement de la question fut un succès augmenter le score d'un point
                if (valid)
                    Dispatch(
                        player === 1 ? SetScorePlayer1(1) : SetScorePlayer2(1)
                    )

                if (step < 4) {
                    newstep++
                    setStep(newstep)
                }

                if (step === 4) {
                    // récupérer le nombre de question validé pour définir le score final
                    const SQ_response = await API.GetValidatedCount(
                        parseInt(`${Duel.id_serie}`, 10),
                        player
                    )
                    if (!SQ_response.canceled) {
                        // vérifier si les données coincide
                        const playerScore =
                            player === 1
                                ? parseInt(`${Duel.score_player1}`, 10)
                                : parseInt(`${Duel.score_player2}`, 10)
                        if (parseInt(`${SQ_response}`, 10) !== playerScore)
                            Dispatch(
                                player === 1
                                    ? SetScore1(parseInt(`${SQ_response}`, 10))
                                    : SetScore2(parseInt(`${SQ_response}`, 10))
                            )

                        // enregistrement du score dans la base de données
                        const S_response = await SAPI.SetScore(
                            parseInt(`${Duel.id_serie}`, 10),
                            player,
                            SQ_response
                        )
                        if (!S_response.canceled) {
                            console.log(`score saved: ${SQ_response}`)
                            // terminer la série
                            const response_S = await SAPI.OnFinish(
                                parseInt(`${Duel.id_serie}`, 10)
                            )
                            if (!response_S.canceled) {
                                // à modifier ajouter une vérification à la root serie onFInish() si 3 victoire sur 2 isFinished = true
                                if (response_S.hasWinner) {
                                    console.log(`duel terminé`)
                                    setEqual(false)
                                    // finish duel
                                    const D_response = await DAPI.FinishDuel(
                                        parseInt(`${Duel.id_duel}`, 10)
                                    )
                                    if (!D_response.canceled) setFinished(true)
                                    setStep(5)
                                } else {
                                    // récupérer le numéro de la série pour savoir si on doit cloturer le duel ou non (limité à 5 série)
                                    const currentSerieNumber =
                                        await SAPI.GetSerieNumber(
                                            parseInt(`${Duel.id_duel}`, 10)
                                        )
                                    if (!currentSerieNumber.canceled) {
                                        let DS_response: any
                                        let isFinished = false
                                        // si c'est la dernière
                                        if (currentSerieNumber === 5) {
                                            // vérifier si le duel est sujette à un tir au but
                                            const hasPenResponse =
                                                await DAPI.HasPenalty(
                                                    parseInt(
                                                        `${Duel.id_duel}`,
                                                        10
                                                    )
                                                )
                                            // vérifier si cette dernière est sujette à un tir au but
                                            if (hasPenResponse) {
                                                // confirmer le tir au but en mettant Equal sur true
                                                setEqual(true)
                                                // create new Serie (tir au but)
                                                DS_response =
                                                    await SAPI.CreateSerie(
                                                        parseInt(
                                                            `${Duel.id_duel}`,
                                                            10
                                                        ),
                                                        Type.PENALTY
                                                    )
                                            } else {
                                                setEqual(false)
                                                // finish duel
                                                const D_response =
                                                    await DAPI.FinishDuel(
                                                        parseInt(
                                                            `${Duel.id_duel}`,
                                                            10
                                                        )
                                                    )
                                                if (!D_response.canceled) {
                                                    setFinished(true)
                                                    isFinished = true
                                                }
                                            }
                                        } else {
                                            // vérifier si cette dernière est sujette à un tir au but
                                            /** if (
                                    parseInt(
                                        `${response_S.score_player1}`,
                                        10
                                    ) ===
                                        parseInt(
                                            `${response_S.score_player2}`,
                                            10
                                        ) &&
                                    response_S.type === 'classic'
                                ) {
                                    // confirmer le tir au but en mettant Equal sur true
                                    setEqual(true)
                                    // create new Serie (tir au but)
                                    DS_response = await SAPI.CreateSerie(
                                        Duel.id_duel,
                                        Type.PENALTY
                                    )
                                } else { 
                                    setEqual(false)
                                    // create new Serie */
                                            DS_response =
                                                await SAPI.CreateSerie(
                                                    parseInt(
                                                        `${Duel.id_duel}`,
                                                        10
                                                    ),
                                                    Type.CLASSIC
                                                )
                                            // }
                                        }

                                        if (isFinished) {
                                            console.log(`duel terminé`)
                                            newstep++
                                            setStep(newstep)
                                        } else {
                                            if (!DS_response.canceled) {
                                                console.log(`serie terminé`)
                                                // envoie du notification de fin de série
                                                socket.emit(`onFinishSerie`, {
                                                    id_duel: Duel.id_duel,
                                                    user_id:
                                                        player === 2
                                                            ? Duel.id_player1
                                                            : Duel.id_player2,
                                                    id_serie: Duel.id_serie,
                                                })
                                                newstep++
                                                setStep(newstep)
                                            } else setError(true)
                                        }
                                    } else setError(true)
                                }
                            } else setError(true)
                        } else setError(true)
                    } else setError(true)
                }
            }
        }
    }

    if (error) return <Error />

    if (step1 && step === 0)
        return (
            <Quizz
                type={step1.quizz_question}
                data={step1}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
            />
        )

    if (step2 && step === 1)
        return (
            <Quizz
                type={step2.quizz_question}
                data={step2}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
            />
        )

    if (step3 && step === 2)
        return (
            <Quizz
                type={step3.quizz_question}
                data={step3}
                level={level}
                question={step}
                onNext={onNext}
                vs={vs}
            />
        )

    if (step4 && step === 3)
        return (
            <Quizz
                type={step4.quizz_question}
                data={step4}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
            />
        )

    if (step5 && step === 4)
        return (
            <Quizz
                type={step5.quizz_question}
                data={step5}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
            />
        )

    if (step === 5)
        return (
            <Finished
                serie={level}
                name={vs}
                isEqual={equal}
                isFinished={finished}
            />
        )

    return <Loading name={vs} />
}
