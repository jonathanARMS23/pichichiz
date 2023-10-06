/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    init: false,
}

const DailyBonusSlice = createSlice({
    initialState,
    name: 'dailybonus',
    reducers: {
        setInit: (state, action) => {
            state.init = action.payload
        },
    },
})

export const { setInit } = DailyBonusSlice.actions

export default DailyBonusSlice.reducer
