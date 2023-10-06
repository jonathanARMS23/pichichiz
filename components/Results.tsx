import React, { useState, useEffect } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootStackParams } from '../navigation/tool/tool'
import Finished from './results/Finished'
import SerieStore from '../services/store/Serie'
import DuelStore from '../services/store/Duel'

type ResultNavigationProp = RouteProp<RootStackParams, 'duelgame'>

export default () => {
    const route = useRoute<ResultNavigationProp>()
    const { id_duel, id_serie } = route.params
    const [level, setLevel] = useState(1)
    const [vs, setVS] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [duel, setDuel] = useState<any>(null)
    const User = useSelector((state: any) => state.user)

    useEffect(() => {
        setLoaded(true)
        const SAPI = new SerieStore()
        const DAPI = new DuelStore()
        let isSubscribe = true
        ;(async () => {
            if (isSubscribe && id_duel && id_serie) {
                // récupérer le numéro de la série pour définir le level
                const response = await SAPI.GetSerieNumber(
                    parseInt(`${id_duel}`, 10)
                )
                if (!response.canceled) {
                    setLevel(response)
                    // récupération des informations du duel pour initialiser le state global
                    const D_response = await DAPI.GetDuelById(id_duel)
                    if (!D_response.canceled) {
                        const player1 = D_response.user
                        const player2 = D_response.vs
                        setVS(
                            parseInt(`${User.id}`, 10) ===
                                parseInt(`${player1.id}`, 10)
                                ? player2.pseudo
                                : player1.pseudo
                        )
                        setDuel({
                            id_player1: player1.id,
                            pseudo_player1: player1.pseudo,
                            id_player2: player2.id,
                            pseudo_player2: player2.pseudo,
                            score_player1: player1.score ?? 0,
                            score_player2: player2.score ?? 0,
                            id_duel: D_response.id_duel,
                            id_serie,
                        })
                        console.log({
                            id_player1: player1.id,
                            pseudo_player1: player1.pseudo,
                            id_player2: player2.id,
                            pseudo_player2: player2.pseudo,
                            score_player1: player1.score ?? 0,
                            score_player2: player2.score ?? 0,
                            id_duel: D_response.id_duel,
                            id_serie,
                        })
                        setLoaded(true)
                    }
                }
            }
        })()

        return () => {
            isSubscribe = false
            SAPI.Cancel()
            DAPI.Cancel()
        }
    }, [id_duel, id_serie])

    if (!loaded || !duel) return null

    return (
        <Finished
            serie={level}
            name={vs}
            isEqual={false}
            isFinished={false}
            duel={duel}
        />
    )
}
