import axios from 'axios'
import Http from './Http'

class User extends Http {
  constructor() {
    super('users/')
  }

  async login(data) {
    const { access_token } = await this.post('login', data)
    localStorage.setItem('@sommittee.access_token', access_token)
    axios.defaults.headers.Authorization = `Bearer ${access_token}`
  }

  async profile() {
    try {
      const response = await this.get('profile')
      return response
    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error)
      throw error
    }
  }
}

export default User
