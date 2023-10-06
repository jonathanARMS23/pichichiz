/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dev: false,
}

const modeSlice = createSlice({
    initialState,
    name: 'mode',
    reducers: {
        set: (state, action) => {
            if (action.payload === 'footcaro01') state.dev = !state.dev
        },
    },
})

export const { set } = modeSlice.actions
export default modeSlice.reducer
