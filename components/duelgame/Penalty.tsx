import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Quiz from '../../services/store/Penalty'
import SerieQuestionStore, {
    Validation,
} from '../../services/store/SerieQuestion'
import { getRandomNumberBetween } from '../../services/factory/Duel'
import SerieStore from '../../services/store/Serie'
import socket from '../../services/socket/socket'
import { SetScorePlayer1, SetScore1 } from '../../store/reducers/duel'
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
    const QuestionLevel = getRandomNumberBetween(1, 30)
    const Duel = useSelector((state: any) => state.duel)
    const [inputResponse, setInputResponse] = useState(0)
    const [step1, setStep1] = useState<any>(null)
    /* const [step2, setStep2] = useState<any>(null)
    const [step3, setStep3] = useState<any>(null)
    const [step4, setStep4] = useState<any>(null)
    const [step5, setStep5] = useState<any>(null)
    const [step6, setStep6] = useState<any>(null) */
    const [step, setStep] = useState(parseInt(`${steps}`, 10))
    const [error, setError] = useState(false)

    /**
     * chargement des questions:
     * dépendance:
     * level: lié au numéro de la série et définie la difficulté des questions
     */

    // Step 1
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(0, QuestionLevel)
                setStep1(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // Step 2
    /** useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(1, QuestionLevel)
                setStep2(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // Step 3
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(1, QuestionLevel)
                setStep3(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // Step 4
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(0, QuestionLevel)
                setStep4(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // Step 5
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(1, QuestionLevel)
                setStep5(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level])

    // Step 6
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed) {
            ;(async () => {
                const response = await API.getQuestionByStep(0, QuestionLevel)
                setStep6(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level]) */

    // fin du chargement

    const GetQuestionData = (indice: number) => {
        switch (indice) {
            case 0:
                return step1
            /* case 1:
                return step2
            case 2:
                return step3
            case 3:
                return step4
            case 4:
                return step5
            case 5:
                return step6 */
            default:
                return step1
        }
    }

    // fonction appelé par le bouton "suivant"
    // valid défini si la question a été correctement répondu ou non
    const onNext = async (valid: boolean) => {
        console.log(`validation: ${valid}`)
        const API = new SerieQuestionStore()
        const SAPI = new SerieStore()
        const question = GetQuestionData(step)
        let newstep = step
        console.log({
            id_serie: Duel.id_serie,
            id_question: question.quizz_id,
            id_reponse: question.quizz_response,
            model: question.quizz_question,
            difficulty: level,
            player_1: valid ? Validation.VALIDE : Validation.RATER,
            response: inputResponse,
        })
        if (!Duel.id_serie || !question.quizz_id) setError(true)
        else {
            // enregistrement de la question
            const response = await API.CreatePenalty({
                id_serie: Duel.id_serie,
                id_question: question.quizz_id,
                id_reponse: question.quizz_response,
                model: question.quizz_question,
                difficulty: level,
                player_1: valid ? Validation.VALIDE : Validation.RATER,
                response: parseInt(`${inputResponse}`, 10),
            })
            console.log(`creation question serie: ${response}`)

            if (response) {
                // si l'enregistrement de la question fut un succès augmenter le score d'un point
                if (valid) Dispatch(SetScorePlayer1(1))

                if (step < 0) {
                    newstep++
                    setStep(newstep)
                }

                if (step === 0) {
                    console.log('finalisation')
                    // récupérer le nombre de question validé pour définir le score final
                    const SQ_response = await API.GetValidatedCount(
                        Duel.id_serie,
                        1
                    )
                    console.log(`valider: ${SQ_response}`)
                    if (!SQ_response.canceled) {
                        // vérifier si les données coincide
                        if (
                            parseInt(`${SQ_response}`, 10) !==
                            parseInt(`${Duel.score_player1}`, 10)
                        )
                            Dispatch(SetScore1(parseInt(`${SQ_response}`, 10)))

                        console.log(`modification de score`)
                        // enregistrement du score dans la base de données
                        const S_response = await SAPI.SetScore(
                            Duel.id_serie,
                            1,
                            SQ_response
                        )
                        console.log(S_response)
                        if (!S_response.canceled) {
                            console.log(`score saved: ${SQ_response}`)
                            // envoie du notification de fin de série
                            socket.emit(`onFinishSerie`, {
                                id_duel: Duel.id_duel,
                                user_id: Duel.id_player2,
                                id_serie: Duel.id_serie,
                            })
                            newstep++
                            setStep(newstep)
                        } else setError(true)
                    } else setError(true)
                }
            } else setError(true)
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

    /** if (step2 && step === 1)
        return (
            <Quizz
                type={step2.quizz_question}
                data={step2}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
                setInput={setInputResponse}
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
                setInput={setInputResponse}
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
                setInput={setInputResponse}
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
                setInput={setInputResponse}
            />
        )

    if (step6 && step === 5)
        return (
            <Quizz
                type={step6.quizz_question}
                data={step6}
                level={level}
                question={step + 1}
                onNext={onNext}
                vs={vs}
                setInput={setInputResponse}
            />
        ) */

    if (step === 1)
        return (
            <Finished
                serie={level}
                name={vs}
                isEqual={false}
                isFinished={false}
            />
        )

    return <Loading name={vs} />
}
