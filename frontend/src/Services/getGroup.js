import instance from './api'

const UserGroup = (token) => {
  return instance.post('/group/user', token)
}

export default UserGroup