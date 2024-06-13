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
    try {
      const response = await this.get('profile')
      return response
    } catch (error) {
      throw error
    }
  }

  async update(token, id, data) {
    try {
      const response = await this.put(`${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
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
