/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

interface IState {
    haveAd: boolean
}

const initialState: IState = {
    haveAd: false,
}

const pubSlice = createSlice({
    initialState,
    name: 'pubs',
    reducers: {
        set: (state, action) => {
            state.haveAd = action.payload
        },
    },
})

export const { set } = pubSlice.actions
export default pubSlice.reducer
