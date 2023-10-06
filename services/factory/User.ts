import AsyncStorage from '@react-native-async-storage/async-storage'
import IUser from '../models/User'
import { setUser } from '../../store/reducers/user'
import { getUser } from '../data/data'
import Store from '../../store/configureStore'

export const Init = async () => {
    // à modifier
    try {
        const user = getUser()
        const data = {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            pseudo: user.pseudo,
        }
        Store.dispatch(setUser(data))

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const ShareProfil = () => {
    const user = getUser()
    return {
        pseudo: user.pseudo,
        code: user.code,
    }
}

export const getPlayerCareer = async () => {
    try {
        const data = await AsyncStorage.getItem('career')
        return data ? JSON.parse(data).data : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const validateLevelInCareer = async (
    level: number,
    score: number,
    unlocked: number
) => {
    try {
        // get career
        const career = (await getPlayerCareer()) as Array<any> | null
        if (career) {
            // const data = [...career, { level, score }]
            let data = career
            const index = career.findIndex((el: any) => el.level === level)
            if (index !== -1) {
                const newscore =
                    parseInt(`${career[index].score}`, 10) <=
                    parseInt(`${score}`, 10)
                        ? parseInt(`${score}`, 10)
                        : parseInt(`${career[level].score}`, 10)
                career[index] = { ...career[index], score: newscore }
                data =
                    career.length < unlocked
                        ? [...career, { level: unlocked, score: 0 }]
                        : career
            }

            await AsyncStorage.setItem('career', JSON.stringify({ data }))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const setLevelScore = async (level: number, score: number) => {
    try {
        // get career
        const career = (await getPlayerCareer()) as Array<any> | null
        if (career) {
            const index = career.findIndex((el: any) => el.level === level)
            if (index !== -1) {
                career[index] = { ...career[index], score }
            }

            await AsyncStorage.setItem('career', JSON.stringify({ career }))

            return true
        }

        return false
    } catch (error) {
        console.log(error)

        return false
    }
}

export const setUserCareer = async (career: Array<any>) => {
    try {
        const data = career
        await AsyncStorage.setItem('career', JSON.stringify({ data }))

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const InitCareer = async () => {
    try {
        const data = { data: [{ level: 1, score: 0 }] }
        await AsyncStorage.setItem('career', JSON.stringify(data))
        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const getPlayerScore = async () => {
    try {
        const data = await AsyncStorage.getItem('score')
        return data ? JSON.parse(data).score : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setPlayerScore = async (score: number) => {
    try {
        const data = { score }
        await AsyncStorage.setItem('score', JSON.stringify(data))

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getPlayerHP = async () => {
    try {
        const data = await AsyncStorage.getItem('hp')
        return data ? JSON.parse(data).hp : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setPlayerHP = async (hp: number) => {
    try {
        const data = { hp }
        await AsyncStorage.setItem('hp', JSON.stringify(data))

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const saveUser = async (data: IUser) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(data))

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

export const getUserFromStorage = async () => {
    try {
        const data = await AsyncStorage.getItem('user')

        console.log(data)

        if (!data) return undefined

        const object = JSON.parse(data)
        return object
    } catch (error) {
        console.log(error)

        return undefined
    }
}
