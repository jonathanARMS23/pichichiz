/* eslint-disable camelcase */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import API from './API'
import { SOCKET_SERVER_URL } from '../socket/socket'

export default class OAuth extends API {
    private URL = `https://www.footballdatabase.eu/api/quizz/index.php?controller=player`

    private SOCKET_SERVER_URL = `${SOCKET_SERVER_URL}/api`

    public GenerateKeyFromSocketServer = async () => {
        try {
            const response = (
                await axios.get(`${this.SOCKET_SERVER_URL}/token/generate`)
            ).data

            if (!response.success) return { canceled: true }

            const data = {
                token: response.data,
                expire_in: moment().add(1, 'd'),
            }

            await AsyncStorage.setItem('socket_token', JSON.stringify(data))

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public InitKeyFromSocketServer = async () => {
        try {
            const data = await AsyncStorage.getItem('socket_token')

            if (!data) {
                const key = await this.GenerateKeyFromSocketServer()
                return key
            }

            const { token, expire_in } = JSON.parse(data)

            if (!token || !expire_in) return { canceled: true }

            if (moment(expire_in).diff(moment(), 'days') < 0) {
                const response = (
                    await axios.get(`${this.SOCKET_SERVER_URL}/token/generate`)
                ).data

                if (!response) return { canceled: true }

                // save in local storage

                const refreshed = {
                    token: response,
                    expire_in: moment().add(1, 'd'),
                }

                await AsyncStorage.setItem(
                    'socket_token',
                    JSON.stringify(refreshed)
                )

                return refreshed
            }

            return JSON.parse(data)
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GenerateKey = async () => {
        try {
            const response = (await axios.get(`${this.URL}&action=generatekey`))
                .data

            const { token } = response
            if (response.error || !token) return { canceled: true }

            // save in local storage

            const data = {
                token,
                expire_in: moment().add(1, 'd'),
            }

            await AsyncStorage.setItem('token', JSON.stringify(data))

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public InitKey = async () => {
        try {
            console.log('init token')
            const data = await AsyncStorage.getItem('token')

            if (!data) {
                const key = await this.GenerateKey()
                return key
            }

            const { token, expire_in } = JSON.parse(data)

            if (!token || !expire_in) return { canceled: true }

            if (moment(expire_in).diff(moment(), 'days') <= 0) {
                // regenerate token
                console.log('regenerate token')
                const response = (
                    await axios.get(`${this.URL}&action=generatekey`)
                ).data

                if (response.error || !response.token) return { canceled: true }

                // save in local storage

                const refreshed = {
                    token: response.token,
                    expire_in: moment().add(1, 'd'),
                }

                await AsyncStorage.setItem('token', JSON.stringify(refreshed))

                return refreshed
            }

            return JSON.parse(data)
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public Signup = async (
        pseudo: string,
        email: string,
        password: string,
        phone: string,
        token: string
    ) => {
        try {
            const data = {
                pseudo,
                email,
                password,
                phone,
            }

            const response = (
                await axios.post(`${this.URL}&action=create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            if (response.error) return { canceled: true }

            return response.id
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public Signin = async (email: string, password: string, token: string) => {
        try {
            const data = {
                email,
                password,
            }
            const response = (
                await axios.post(`${this.URL}&action=signin`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data

            console.log(response)

            if (response.error) return { canceled: true }

            return response.data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }
}
