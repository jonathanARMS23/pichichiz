/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dev: false,
    duelaccess: false,
}

const modeSlice = createSlice({
    initialState,
    name: 'mode',
    reducers: {
        set: (state, action) => {
            if (action.payload === 'footcaro01') state.dev = !state.dev
        },
        setDuelAccess: (state, action) => {
            if (action.payload > 4) state.duelaccess = true
            else state.duelaccess = false
        },
    },
})

export const { set, setDuelAccess } = modeSlice.actions
export default modeSlice.reducer
