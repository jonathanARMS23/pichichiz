/* eslint-disable no-shadow */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SOCKET_SERVER_URL } from '../socket/socket'
import API from './API'

/* eslint-disable no-unused-vars */
export enum Validation {
    VALIDE = 'valide',
    LOADING = 'loading',
    RATER = 'rater',
}
/* eslint-enable no-unused-vars */

export interface ICreateQuestionSerie {
    id_serie: number
    id_question: number
    id_reponse: number
    model: string
    difficulty: number
    player_1?: Validation
    player_2?: Validation
    response?: number
}

export interface SetValidationQuestion {
    id_serie_question: number
    player: number
    validation: Validation
}

export interface SetValidationQuestionPenalty {
    id_serie_question: number
    response: number
}

export default class SerieQuestionStore extends API {
    private URL = `${SOCKET_SERVER_URL}/api`

    public Create = async (data: ICreateQuestionSerie) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(`${this.URL}/serie/question/create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            return response.success
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public CreatePenalty = async (data: ICreateQuestionSerie) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.post(
                    `${this.URL}/serie/question/penalty/create`,
                    data,
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

    public GetQuestions = async (id_serie: number | string) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(`${this.URL}/serie/questions/${id_serie}`, {
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

    public GetQuestion = async (
        id_serie: number,
        model: string,
        difficulty: number
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/question?id_serie=${id_serie}&model=${model}&difficulty=${difficulty}`,
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

    public SetValidation = async (data: SetValidationQuestion) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(`${this.URL}/serie/question/validate`, data, {
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

    public SetValidationPenalty = async (
        data: SetValidationQuestionPenalty
    ) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.put(
                    `${this.URL}/serie/question/validate/penalty`,
                    data,
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

    public GetSerieQuestionCount = async (id_serie: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/question/count?id_serie=${id_serie}`,
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

    public GetValidatedCount = async (id_serie: number, player: number) => {
        try {
            const dataToken = await AsyncStorage.getItem('socket_token')
            if (!dataToken) return { canceled: true }

            const { token } = JSON.parse(dataToken)
            if (!token) return { canceled: true }

            const response = (
                await axios.get(
                    `${this.URL}/serie/question/validate/count?id_serie=${id_serie}&player=${player}`,
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
}
