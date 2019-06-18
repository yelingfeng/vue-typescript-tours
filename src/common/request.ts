import axios from 'axios'
import { Message } from 'element-ui'
const timeout: number = 180000
const NOTIFY_CLOSE_TIME = 3000

const service = axios.create({
    baseURL: process.env.VUE_APP_MOCK_URL,
    timeout
})

declare type MessageType = 'success' | 'warning' | 'info' | 'error'
interface MessageContent {
    message: string
    type: MessageType
    duration?: number
}

const sendMessage = (msg: string, type: MessageType) => {
    let content: MessageContent
    if (type === 'error') {
        content = {
            message: msg,
            type
        }
    } else {
        content = {
            message: msg,
            type,
            duration: NOTIFY_CLOSE_TIME
        }
    }
    Message(content)
}

service.interceptors.response.use(
    response => {
        const res = response.data
        const status = response.status
        if (status === 200) {
            if (res.status === 300) {
                sendMessage(res.message, 'error')
            } else if (res.status === 201 || res.status === 202) {
                sendMessage(res.message, 'success')
            }
            return response.data
        }
    },
    error => {
        sendMessage(error.message, 'error')
        return Promise.reject(error)
    }
)
export default service
