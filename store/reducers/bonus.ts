/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { IBonus } from '../../services/models/Bonus'

const initialState: IBonus = {
    list: [],
}

const BonusSlice = createSlice({
    initialState,
    name: 'bonus',
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
        },
        // ajout de nouveau type bonus
        addNewBonus: (state, action) => {
            state.list = [...state.list, action.payload]
        },
        // ajout de bonus
        addBonus: (state, action) => {
            state.list.forEach((item) => {
                if (item.nom === action.payload.nom)
                    item.count += action.payload.count
            })
        },
        InitializeBonusState: (state, action) => {
            state.list = action.payload.list ?? []
        },
        activateBonus: (state, action) => {
            state.list.forEach((item) => {
                if (item.nom === action.payload.nom) item.introduced = true
            })
        },
        useBonus: (state, action) => {
            state.list.forEach((item) => {
                if (item.nom === action.payload.nom) item.count -= 1
            })
        },
        clearBonus: (state) => {
            state = initialState
        },
    },
})

export const {
    setList,
    addNewBonus,
    addBonus,
    InitializeBonusState,
    activateBonus,
    useBonus,
    clearBonus,
} = BonusSlice.actions

export default BonusSlice.reducer
