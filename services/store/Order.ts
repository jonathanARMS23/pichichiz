import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

export interface CreateOrder {
    quantity: number
    type: string
    name?: string
    id_user: number | string
}

export default class OrderStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public Create = async (data: CreateOrder) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(`${this.URL}/order/create`, data, {
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

    public getOrder = async (id_order: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/order/${id_order}`, {
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
