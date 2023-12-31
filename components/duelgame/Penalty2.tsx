/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Quiz from '../../services/store/Penalty'
import SerieQuestionStore from '../../services/store/SerieQuestion'
import socket from '../../services/socket/socket'
import { SetScorePlayer2, SetScore2 } from '../../store/reducers/duel'
import SerieStore /* Type */ from '../../services/store/Serie'
import DuelStore from '../../services/store/Duel'
import Quizz from './QuizzPenalty'
import Finished from './Finished'
import Loading from './Loading'
import Error from './Error'

interface IProps {
    level: number
    steps: number
    vs: string
}

export default ({ level, steps, vs }: IProps) => {
    const Dispatch = useDispatch()
    const Duel = useSelector((state: any) => state.duel)
    // const User = useSelector((state: any) => state.user)
    const [inputResponse, setInputResponse] = useState(0)
    const [step1, setStep1] = useState<any>(null)
    const [step, setStep] = useState(parseInt(`${steps}`, 10))
    const [questions, setQuestions] = useState<Array<any>>([])
    const [finished, setFinished] = useState(false) // duel is finished ?
    const [error, setError] = useState(false)

    // chargement des questions
    useEffect(() => {
        const API = new Quiz()
        const SQAPI = new SerieQuestionStore()
        let isSubscribed = true
        ;(async () => {
            if (isSubscribed) {
                const S_response = await SQAPI.GetQuestions(Duel.id_serie)
                if (!S_response.canceled && Array.isArray(S_response)) {
                    setQuestions(S_response)
                    const ids = S_response.map((el: any) => el.id_question)
                    // ids.reverse()
                    const response = await API.GetQuestionByIds(ids)
                    if (
                        response &&
                        Array.isArray(response) &&
                        response.length > 0
                    ) {
                        setStep1(response[0])
                    }
                }
            }
        })()

        return () => {
            API.Cancel()
            SQAPI.Cancel()
            isSubscribed = false
        }
    }, [])
    // fin du chargement des questions

    const GetQuestionData = (indice: number) => {
        switch (indice) {
            case 0:
                return step1
            default:
                return step1
        }
    }

    // fonction appelé par le  bouton "suivant"
    // valid défini si la question a été correctement répondu ou non
    const onNext = async (valid: boolean) => {
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
        const response = await API.SetValidationPenalty({
            id_serie_question: serie_queston.id_serie_question,
            response: parseInt(`${inputResponse}`, 10),
        })
        console.log(`creation question serie: ${response}`)
        if (!response.canceled) {
            // si l'enregistrement de la question fut un succès augmenter le score d'un point
            if (valid) Dispatch(SetScorePlayer2(1))

            if (step < 0) {
                newstep++
                setStep(newstep)
            }

            if (step === 0) {
                // récupérer le nombre de question validé pour définir le score final
                const SQ_response = await API.GetValidatedCount(
                    Duel.id_serie,
                    2
                )
                if (!SQ_response.canceled) {
                    // vérifier si les données coincide
                    if (
                        parseInt(`${SQ_response}`, 10) !==
                        parseInt(`${Duel.score_player2}`, 10)
                    )
                        Dispatch(SetScore2(parseInt(`${SQ_response}`, 10)))

                    // enregistrement du score dans la base de données
                    const S_response = await SAPI.SetScore(
                        Duel.id_serie,
                        2,
                        SQ_response
                    )
                    if (!S_response.canceled) {
                        console.log(`score saved: ${SQ_response}`)
                        // terminer la série
                        const response_S = await SAPI.OnFinish(Duel.id_serie)
                        if (!response_S.canceled) {
                            // cloturer le duel
                            const D_response = await DAPI.FinishDuel(
                                Duel.id_duel
                            )
                            if (!D_response.canceled) {
                                setFinished(true)
                                console.log(`duel terminé`)
                                newstep++
                                setStep(newstep)
                                socket.emit(`onFinishSerie`, {
                                    id_duel: Duel.id_duel,
                                    user_id: Duel.id_player1,
                                    id_serie: Duel.id_serie,
                                })
                            }
                        } else setError(true)
                    } else setError(true)
                } else setError(true)
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
                setInput={setInputResponse}
            />
        )

    if (step === 1)
        return (
            <Finished
                serie={level}
                name={vs}
                isFinished={finished}
                isEqual={false}
            />
        )

    return <Loading name={vs} />
}
