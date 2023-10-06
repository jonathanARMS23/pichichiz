import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParams } from '../navigation/tool/tool'
import { initialize } from '../store/reducers/game'
import Quiz from '../services/store/quiz'
import Quizz from './sologame/Quizz'
import NoHP from './sologame/NoHP'
import Finished from './sologame/Finished'
import Loading from './game/Loading'
import ErrorLoading from './sologame/ErrorLoading'

type SoloGameNavProp = RouteProp<RootStackParams, 'sologame'>

export default () => {
    const { params } = useRoute<SoloGameNavProp>()
    const stage = params.level
    const dispatch = useDispatch()
    const info = useSelector((state: any) => state.game)
    const user = useSelector((state: any) => state.user)
    const [level, setLevel] = useState(stage)
    const [step1, setStep1] = useState<any>(null)
    const [step2, setStep2] = useState<any>(null)
    const [step3, setStep3] = useState<any>(null)
    const [step4, setStep4] = useState<any>(null)
    const [step5, setStep5] = useState<any>(null)
    const [step6, setStep6] = useState<any>(null)
    const [step7, setStep7] = useState<any>(null)
    const [step8, setStep8] = useState<any>(null)
    const [step9, setStep9] = useState<any>(null)
    const [step10, setStep10] = useState<any>(null)
    const [step, setStep] = useState(0)
    const [reload, setReload] = useState(false)
    const [error, setError] = useState(false)

    const onNext = () => {
        let newstep = step
        if (step < 10) {
            newstep++
            setStep(newstep)
        }
    }

    // fonction utiliser par le bouton dans finished
    const onFininshed = () => {
        let tmp = level
        // charger le prochain level si celui ci est débloqué
        if (info.note > 5) {
            tmp++
            setLevel(tmp)
            setStep(0)
            // sinon remettre à 0 l'épreuve du niveau
        } else setStep(0)

        // forcer l'update
        setReload(true)
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 500)
    }

    // fonction pour réinitialiser les épreuves
    const reinitialize = () => {
        setStep1(null)
        setStep2(null)
        setStep3(null)
        setStep4(null)
        setStep5(null)
        setStep6(null)
        setStep7(null)
        setStep8(null)
        setStep9(null)
        setStep10(null)
    }

    useEffect(() => {
        dispatch(initialize({ pseudo: user.pseudo, score: user.score }))
    }, [reload])

    useEffect(() => {
        if (reload) reinitialize()
    }, [reload])

    // get all questions
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetAllQuestionsByLevel(level, 10) // j'envoie le level en paramètre de la fonction d'appel API
                console.log(response)
                if (Array.isArray(response) && response.length === 10) {
                    setStep1(response[0])
                    setStep2(response[1])
                    setStep3(response[2])
                    setStep4(response[3])
                    setStep5(response[4])
                    setStep6(response[5])
                    setStep7(response[6])
                    setStep8(response[7])
                    setStep9(response[8])
                    setStep10(response[9])
                } else setError(true)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 1
    /**
     * 0: indique le numéro de la question sur une serie de 10 question
     * level: indique le level
     */
    /** useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level) // j'envoie le level en paramètre de la fonction d'appel API
                setStep1(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 2
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep2(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 3
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep3(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 4
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep4(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 5
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep5(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 6
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep6(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 7
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep7({ ...response, Title: 'Qui est ce joueur' })
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 8
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep8(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 9
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep9(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload])

    // Step 10
    useEffect(() => {
        const API = new Quiz()
        let isSubscribed = true
        if (isSubscribed && !reload) {
            ;(async () => {
                const response = await API.GetQuestionsByLevel(level)
                setStep10(response)
            })()
        }

        return () => {
            isSubscribed = false
            API.Cancel()
        }
    }, [level, reload]) */

    if (error) return <ErrorLoading />

    if (user.hp < 1) return <NoHP />

    if (step1 && step === 0)
        return (
            <Quizz
                type={step1.quizz_question}
                data={step1}
                level={level}
                question={step + 1}
                onNext={onNext}
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
            />
        )

    if (step3 && step === 2)
        return (
            <Quizz
                type={step3.quizz_question}
                data={step3}
                level={level}
                question={step + 1}
                onNext={onNext}
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
            />
        )

    if (step7 && step === 6)
        return (
            <Quizz
                type={step7.quizz_question}
                data={step7}
                level={level}
                question={step + 1}
                onNext={onNext}
            />
        )

    if (step8 && step === 7)
        return (
            <Quizz
                type={step8.quizz_question}
                data={step8}
                level={level}
                question={step + 1}
                onNext={onNext}
            />
        )

    if (step9 && step === 8)
        return (
            <Quizz
                type={step9.quizz_question}
                data={step9}
                level={level}
                question={step + 1}
                onNext={onNext}
            />
        )

    if (step10 && step === 9)
        return (
            <Quizz
                type={step10.quizz_question}
                data={step10}
                level={level}
                question={step + 1}
                onNext={onNext}
            />
        )

    if (step === 10) return <Finished level={level} onPress={onFininshed} />

    return <Loading />
}
