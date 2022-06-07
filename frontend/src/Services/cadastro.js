import instance from './api'

const newUser = (
    userData
) => {
    return instance.post('/user', userData)
}

export default newUser