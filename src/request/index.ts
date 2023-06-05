import axios from 'axios'

const requestInstance = axios.create({
    baseURL: 'https://restapi.amap.com',
    timeout: 10000
})

requestInstance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

export default requestInstance