/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pseudo: '',
    score: 0,
    newScore: 0,
    note: 0,
}

const GameSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        initialize: (state, action) => {
            state.pseudo = action.payload.pseudo // pseudo du joueur
            state.score = action.payload.score // score actuel du joueur
            state.newScore = 0
            state.note = 0
        },
        fakeInitialisation: (state) => {
            state.pseudo = 'ARMS23'
            state.score = 1966
            state.newScore = 0
            state.note = 0
        },
        upScore: (state, action) => {
            state.newScore += action.payload
            state.note += 1
        },
        validate: (state) => {
            state.score += state.newScore
        },
        clearGame: (state) => {
            state = initialState
        },
    },
})

export const { initialize, upScore, validate, fakeInitialisation, clearGame } =
    GameSlice.actions

export default GameSlice.reducer
