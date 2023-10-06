/* eslint-disable no-restricted-syntax */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IBonusList, IBonus } from '../models/Bonus'
import { getBonusData } from '../data/data'

interface IBonusAdd {
    nom: string
    count: number
}

interface IUserBonus {
    quizz_user_bonus_id: number
    quizz_bonus_id: number
    user_id: number
    count: number
    introduced: number
    nom: string
    description: string
}

export const InitializeBonus = async () => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        if (!data)
            await AsyncStorage.setItem(
                'bonus',
                JSON.stringify({ list: getBonusData() })
            )

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const getBonusList = async () => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        return data ? JSON.parse(data).list : null
    } catch (error) {
        console.log(error)

        return null
    }
}

/** export const setBonus = async (list: Array<IBonusList>) => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        let newData: IBonus
        if (data) {
            newData = { list }
        } else {
            newData = { list: [] }
        }

        await AsyncStorage.setItem('bonus', JSON.stringify(newData))

        return true
    } catch (error) {
        console.log(error)

        return false
    }
} */

export const getBonus = async () => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        return data ? JSON.parse(data).list : null
    } catch (error) {
        console.log(error)

        return null
    }
}

export const addBonusFact = async (bonus: IBonusAdd) => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        if (data) {
            const { list } = JSON.parse(data) as IBonus
            const newList = list.map((item: IBonusList) => {
                // eslint-disable-next-line no-param-reassign
                if (item.nom === bonus.nom)
                    return {
                        ...item,
                        count: item.count + bonus.count,
                    }

                return item
            })

            const save = { list: newList }
            await AsyncStorage.setItem('bonus', JSON.stringify(save))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const useBonusFactory = async (type: string) => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        if (data) {
            const { list } = JSON.parse(data) as IBonus
            for (const el of list) {
                if (el.nom === type) {
                    el.count -= 1
                    break
                }
            }
            await AsyncStorage.setItem('bonus', JSON.stringify({ list }))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const addNewBonus = async (bonus: IBonusList) => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        if (data && JSON.parse(data).list) {
            const newData = { list: [...JSON.parse(data).list, bonus] }
            await AsyncStorage.setItem('bonus', JSON.stringify(newData))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const activateBonusFactory = async (type: string) => {
    try {
        const data = await AsyncStorage.getItem('bonus')
        if (data) {
            const { list } = JSON.parse(data) as IBonus
            const newList = list.map((item: IBonusList) => {
                // eslint-disable-next-line no-param-reassign
                if (item.nom === type)
                    return {
                        ...item,
                        introduced: true,
                    }

                return item
            })

            const save = { list: newList }
            await AsyncStorage.setItem('bonus', JSON.stringify(save))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const formatBonus = (list: Array<IUserBonus>): Array<IBonusList> => {
    const formated = list.map((item) => ({
        id: item.quizz_bonus_id,
        nom: item.nom,
        description: item.description,
        count: item.count,
        introduced: item.introduced === 1,
    }))

    return formated
}
