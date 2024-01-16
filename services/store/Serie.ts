/* eslint-disable class-methods-use-this */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum Type {
    CLASSIC = 'classic',
    PENALTY = 'penalty',
}
/* eslint-enable no-unused-vars */

export default class SerieStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public CreateSerie = async (id_duel: number, type: Type) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const data = {
                id_duel,
                type,
            }

            const response = (
                await axios.post(`${this.URL}/serie/create`, data, {
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

    public GetSeries = async (id_duel: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/series?id_duel=${id_duel}`, {
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

    public GetClassicSeries = async (id_duel: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/series/classic/${id_duel}`, {
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

    public GetInProgressSerie = async (id_duel: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/inprogress?id_duel=${id_duel}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success || !response.data) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public SetScore = async (
        id_serie: number,
        player: number,
        score: number
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const data = {
                id_serie,
                player,
                score,
            }

            const response = (
                await axios.put(`${this.URL}/serie/score`, data, {
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

    public OnFinish = async (id_serie: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/serie/finish`,
                    { id_serie },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public DeleteSerie = async (id_serie: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.delete(`${this.URL}/serie/${id_serie}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (!response.success) return { canceled: true }

            return response.id
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetSerie = async (id_serie: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/serie/${id_serie}`, {
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

    public GetSerieResult = async (id_serie: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/serie/result/${id_serie}`, {
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

    public GetSeriesResult = async (id_duel: number, player: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/series/result?id_duel=${id_duel}&player=${player}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetSerieNumber = async (id_duel: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            console.log('je lance la recup')

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/serie/count/${id_duel}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            console.log(response)

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetQuestions = async (id_serie: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            console.log('je lance la recup')

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/questions/full/${id_serie}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data

            console.log(response)

            if (!response.success) return { canceled: true }

            return { saved: response.saved, data: response.data }
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public VerifyBeforePlaying = async (
        id_serie: number | string,
        id_user: number | string
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            console.log('je lance la recup')

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/play/${id_user}/${id_serie}`,
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

    public closeSerie = async (id_serie: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            console.log('je lance la recup')

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/serie/close/${id_serie}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            console.log(response)

            if (!response.success) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }
}
