/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id_player1: '',
    pseudo_player1: '',
    id_player2: '',
    pseudo_player2: '',
    score_player1: 0,
    score_player2: 0,
    id_duel: '',
    id_serie: '',
}

const DuelSlice = createSlice({
    initialState,
    name: 'duel',
    reducers: {
        CreateDuel: (state, action) => {
            state.id_duel = action.payload.id_duel
            state.id_serie = action.payload.id_serie
            state.id_player1 = action.payload.id_player1
            state.id_player2 = action.payload.id_player2
            state.pseudo_player1 = action.payload.pseudo_player1
            state.pseudo_player2 = action.payload.pseudo_player2
        },
        Clear: (state) => {
            // eslint-disable-next-line no-unused-vars
            state = initialState
        },
        setSerie: (state, action) => {
            state.id_serie = action.payload
        },
        SetScorePlayer1: (state, action) => {
            state.score_player1 += action.payload
        },
        SetScorePlayer2: (state, action) => {
            state.score_player2 += action.payload
        },
        SetScore1: (state, action) => {
            state.score_player1 = action.payload
        },
        SetScore2: (state, action) => {
            state.score_player2 = action.payload
        },
        clearDuel: (state) => {
            state = initialState
        },
    },
})

export const {
    CreateDuel,
    Clear,
    SetScorePlayer1,
    SetScorePlayer2,
    clearDuel,
    SetScore1,
    SetScore2,
} = DuelSlice.actions

export default DuelSlice.reducer
