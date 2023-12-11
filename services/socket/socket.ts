import { io } from 'socket.io-client'

export const SOCKET_SERVER_URL = `https://node.footballdatabase.eu`

const socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] })

socket.on('connect_error', (error) => {
    console.log(error)
})

socket.on('hello', () => {
    console.log(`it's run`)
})

socket.on('success_request', (payload) => {
    console.log(payload)
})

export default socket
