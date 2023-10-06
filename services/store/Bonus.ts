import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CreateBonus, AttributeBonus } from '../models/Bonus'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

export default class BonusStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public create = async (data: CreateBonus) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(`${this.URL}/bonus/create`, data, {
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

    public getBonus = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/bonus`, {
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

    public getUserBonus = async (user_id: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/bonus/${user_id}`, {
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

    public initBonus = async (user_id: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/bonus/init/${user_id}`, {
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

    public AttributeBonus = async (data: AttributeBonus) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(`${this.URL}/bonus/attribute`, data, {
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

    public wonBonus = async (data: AttributeBonus) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(`${this.URL}/bonus/won`, data, {
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

    public useBonus = async (data: AttributeBonus) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(`${this.URL}/bonus/use`, data, {
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

    public deleteBonus = async (id: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.delete(`${this.URL}/bonus/attribute/${id}`, {
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
}
