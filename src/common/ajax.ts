import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
const timeout: number = 180000
const NOTIFY_CLOSE_TIME = 3000

const service = axios.create({
    baseURL: process.env.VUE_APP_MOCK_URL,
    timeout
})

declare type MessageType = 'success' | 'warning' | 'info' | 'error'

const sendMessage = (msg: string, type: MessageType) => {
    if (type === 'error') {
        Message({
            message: msg,
            type
        })
    } else {
        Message({
            message: msg,
            type,
            duration: NOTIFY_CLOSE_TIME
        })
    }
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
