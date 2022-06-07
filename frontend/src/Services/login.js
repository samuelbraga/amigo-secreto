import instance from './api'

const loginUser = (
    postData
) => {
    return instance.post('sessions', postData)
}

export default loginUser