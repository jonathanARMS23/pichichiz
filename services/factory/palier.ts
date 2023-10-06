/* eslint-disable no-restricted-syntax */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPalier } from '../data/data'

export const InitPalier = async () => {
    try {
        const data = await AsyncStorage.getItem('palier')
        if (!data) {
            const extract = getPalier()
            if (Array.isArray(extract))
                await AsyncStorage.setItem(
                    'palier',
                    JSON.stringify({ list: extract })
                )
        }

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const getPalierFactory = async () => {
    try {
        const data = await AsyncStorage.getItem('palier')
        if (data) return JSON.parse(data).list

        return null
    } catch (error) {
        console.log(error)

        return null
    }
}

export const wonBonus = async (level: number) => {
    try {
        const data = await AsyncStorage.getItem('palier')
        if (data) {
            const { list } = JSON.parse(data)
            let won: any = null
            for (const el of list) {
                if (list.level === level) {
                    won = el
                    el.won = true
                }
            }
            if (won && won.won === false) {
                await AsyncStorage.setItem('palier', JSON.stringify({ list }))
                return won
            }
            return null
        }

        return null
    } catch (error) {
        console.log(error)

        return null
    }
}
