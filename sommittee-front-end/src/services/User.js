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

  async update(token, id, data) {
    try {
      console.log('Dados enviados na requisição:', data)
      const response = await this.put(`${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      throw error
    }
  }
}

export default User
