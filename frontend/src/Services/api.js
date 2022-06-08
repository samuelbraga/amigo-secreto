import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://api.mumuz.in/v1'
})

instance.defaults.headers.contentType = 'application/json'

export default instance