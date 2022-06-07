import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3333/v1'
})

instance.defaults.headers.contentType = 'application/json'

export default instance