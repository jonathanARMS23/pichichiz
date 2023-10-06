import { createSlice } from '@reduxjs/toolkit'
import { IRewards } from '../../services/models/Bonus'

const initialState: IRewards = {
    list: [
        {
            level: 4,
            type: 'bonus',
            name: '50/50',
            quantity: 1,
        },
        {
            level: 8,
            type: 'bonus',
            name: 'DOUBLE CHANCE',
            quantity: 1,
        },
        {
            level: 12,
            type: 'bonus',
            name: 'TEMPS',
            quantity: 1,
        },
        {
            level: 16,
            type: 'bonus',
            name: 'PASSER',
            quantity: 1,
        },
        {
            level: 20,
            type: 'bonus',
            name: 'INDICE',
            quantity: 1,
        },
    ],
}

const rewardSlice = createSlice({
    initialState,
    name: 'reward',
    reducers: {},
})

export default rewardSlice.reducer
