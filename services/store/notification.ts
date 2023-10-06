import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export type TYPE =
    | 'friend_request'
    | 'friend_response'
    | 'duel'
    | 'reward'
    | 'bonus'
    | 'hp'
/* eslint-enable no-unused-vars */

export default class NotificationStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public GetAllNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/notification/${id_user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetGameNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/notification/game/${id_user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetFriendNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/notification/friend/${id_user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetCountNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/notification/count/${id_user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public updateAllNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/notification/${id_user}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success) return { canceled: true }

            return response
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public updateGameNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/notification/game/${id_user}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success) return { canceled: true }

            return response
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public updateFriendNotifications = async (id_user: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/notification/friend/${id_user}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success) return { canceled: true }

            return response
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }
}
