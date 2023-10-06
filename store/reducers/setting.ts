/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dailyNotification: false,
    mobileNotification: false,
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setDailyNotif: (state, action) => {
            state.dailyNotification = action.payload
        },
        setMobileNotif: (state, action) => {
            state.mobileNotification = action.payload
        },
    },
})

export const { setDailyNotif, setMobileNotif } = settingSlice.actions
export default settingSlice.reducer
