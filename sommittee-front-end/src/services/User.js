import axios from 'axios'
import Http from './Http'

class User extends Http {
  constructor() {
    super('users/')
  }

  async login(data) {
    try {
      const { access_token } = await this.post('login', data)
      localStorage.setItem('@sommittee.access_token', access_token)
      axios.defaults.headers.Authorization = `Bearer ${access_token}`
    } catch (error) {
      throw error
    }
  }

  async profile() {
    return await this.get('profile')
  }

  async update(id, data) {
    const response = await this.put(`${id}`, data)
    return response.data
  }

  async updatedLogin(dataLogin) {
    try {
      const response = await this.post('login', dataLogin)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default User
