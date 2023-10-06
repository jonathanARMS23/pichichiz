import AsyncStorage from '@react-native-async-storage/async-storage'

export const verifyName = (text: string) => {
    const regex = /^[a-zA-Z]{2,50}$/
    return regex.test(text)
}

export const verifyTel = (text: string) => {
    const regex = /^[0-9]{10,20}$/
    return regex.test(text)
}

export const verifyEmail = (text: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return regex.test(text)
}

export const verifyPassword = (text: string) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+{};:,<.>?~`[\]\\/]{8,}$/
    return regex.test(text)
}

export const getToken = async () => {
    try {
        const data = await AsyncStorage.getItem('token')
        if (!data) return undefined

        const { token } = JSON.parse(data)

        return token
    } catch (error) {
        console.log(error)

        return undefined
    }
}
