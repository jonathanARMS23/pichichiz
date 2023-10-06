/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParams } from '../navigation/tool/tool'
import SerieStore from '../services/store/Serie'
import SerieQuestionStore from '../services/store/SerieQuestion'
import Loading from './duelgame/Loading'
import Serie from './duelgame/Serie'
import Serie2 from './duelgame/Serie2'
import Penalty from './duelgame/Penalty'
import Penalty2 from './duelgame/Penalty2'
import Wait from './duelgame/Wait'

type duelGameNavigationProp = RouteProp<RootStackParams, 'duelgame'>

export default () => {
    const route = useRoute<duelGameNavigationProp>()
    const { id_duel, id_serie } = route.params
    const User = useSelector((state: any) => state.user)
    const Duel = useSelector((state: any) => state.duel)
    const [level, setLevel] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [waiting, setWaiting] = useState(false)
    const [step, setStep] = useState(0)
    const [verify, setVerify] = useState(false)
    const [SType, setSType] = useState('classic')

    useEffect(() => {
        // get serie
        const API = new SerieStore()
        const SQAPI = new SerieQuestionStore()
        setVerify(false)
        ;(async () => {
            // récupérer le numéro de la série pour définir le level
            const response = await API.GetSerieNumber(
                parseInt(`${id_duel}`, 10)
            )
            if (!response.canceled) {
                setLevel(response)
                // récupérer les infos de la série pour savoir qui doit jouer
                const Sresponse = await API.GetInProgressSerie(
                    parseInt(`${id_duel}`, 10)
                )
                if (!Sresponse.canceled) {
                    setSType(Sresponse.type)
                    /**
                     * Si je suis le défieur:
                     * 1 - si mon score est encore null le jeu est lancé
                     * 2 - si mon score est non null et que le score de mon adversaire est null j'attends
                     * 3 - si le joueur a déjà jouer une nouvelle serie aura été créé
                     * Si je suis le défié:
                     * 1 - si le score du défieur est null j'attends
                     * 2 - si mon score est null le jeu est lancé
                     * 3 - à la fin de mon jeu une nouvelle serie est créer
                     */
                    if (
                        parseInt(`${User.id}`, 10) ===
                        parseInt(`${Duel.id_player1}`, 10)
                    ) {
                        // je suis le joueur 1
                        if (Sresponse.score_player1 === null) {
                            // joueur 1 doit jouer
                            // définir l'attente sur false
                            setWaiting(false)
                            // verifier le steps
                            const SQ_response =
                                await SQAPI.GetSerieQuestionCount(
                                    parseInt(`${id_serie}`, 10)
                                )
                            if (!SQ_response.canceled) setStep(SQ_response)

                            // sinon joueur 1 doit patienter
                        } else setWaiting(true)
                    } else {
                        // je suis le joueur 2
                        // je dois attendre que le joueur 1 ait fini la série
                        if (Sresponse.score_player1 === null) setWaiting(true)
                        else {
                            setWaiting(false)
                            // verifier le steps
                            const SQ_response = await SQAPI.GetValidatedCount(
                                parseInt(`${id_serie}`, 10),
                                2
                            )
                            if (!SQ_response.canceled) setStep(SQ_response)
                        }
                    }
                    console.log(`finish verify: ${true}`)
                    setVerify(true)
                }
            }
        })()

        return () => {
            API.Cancel()
            SQAPI.Cancel()
        }
    }, [])

    // si l'initialisation n'est pas encore fini, afficher le chargement
    if (!verify)
        return (
            <Loading
                name={
                    parseInt(`${User.id}`, 10) ===
                    parseInt(`${Duel.id_player1}`, 10)
                        ? Duel.pseudo_player2
                        : Duel.pseudo_player1
                }
            />
        )

    // si ce n'est pas le tour du joueur, afficher un message
    if (waiting) return <Wait />

    // si c'est une question tir au but
    if (
        SType !== 'classic' &&
        parseInt(`${User.id}`, 10) === parseInt(`${Duel.id_player1}`, 10)
    )
        return <Penalty level={level} steps={step} vs={Duel.pseudo_player2} />

    // si c'est une question tir au but joueur 2
    if (SType !== 'classic')
        return <Penalty2 level={level} steps={step} vs={Duel.pseudo_player1} />

    // si c'est le tour du joueur 1 de jouer
    if (parseInt(`${User.id}`, 10) === parseInt(`${Duel.id_player1}`, 10))
        return <Serie level={level} steps={step} vs={Duel.pseudo_player2} />

    // si c'est le tour du joueur 2 de jouer
    return <Serie2 level={level} steps={step} vs={Duel.pseudo_player1} />
}
