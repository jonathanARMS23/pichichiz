import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

export default class HPStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public getHP = async (id: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/hp/${id}`, {
                    cancelToken: this.source.token,
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

    public addHP = async (id: number, value: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const data = {
                id,
                value,
            }

            const response = (
                await axios.put(`${this.URL}/hp/add`, data, {
                    cancelToken: this.source.token,
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

    public substractHP = async (id: number, value: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const data = {
                id,
                value,
            }

            const response = (
                await axios.put(`${this.URL}/hp/substract`, data, {
                    cancelToken: this.source.token,
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
