/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import API from './API'
import { SOCKET_SERVER_URL } from '../socket/socket'

export interface IBodyId {
    user_id: string | number
    friend_id: string | number
}

export interface IBodyEmail {
    user_id: string | number
    email: string
}

export default class FriendAPI extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public getUserByPseudo = async (pseudo: string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/user/pseudo/${pseudo}`, {
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

    public getUserFriendRequestReceived = async (id: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/user/friends/request/received/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            console.log(response)

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public getUserFriendRequestSended = async (id: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/user/friends/request/sended/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            console.log(response)

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public confirmInvitation = async (
        user_id: number | string,
        friend_id: number | string
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/user/friends/request/confirm?user_id=${user_id}&friend_id=${friend_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            return response.success
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public deleteInvitation = async (
        user_id: number | string,
        friend_id: number | string
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.delete(
                    `${this.URL}/user/friends/request/reject?user_id=${user_id}&friend_id=${friend_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            return response.success
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public deleteFriend = async (
        user_id: number | string,
        friend_id: number | string
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.delete(
                    `${this.URL}/user/friends/delete?user_id=${user_id}&friend_id=${friend_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            return response.success
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public getUserFriends = async (id: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/user/friends/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }

            throw error
        }
    }

    public sendFriendRequest = async (data: IBodyId) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(`${this.URL}/friend/request/id`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public sendFriendRequestEmail = async (data: IBodyEmail) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(`${this.URL}/friend/request/email`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }
}
