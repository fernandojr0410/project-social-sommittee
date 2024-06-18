import axios from 'axios'
import Http from './Http'

class Auth extends Http {
  constructor() {
    super('users/auth/')
  }

  async login(data) {
    const { access_token } = await this.post('login', data)
    localStorage.setItem('@sommittee.access_token', access_token)
    axios.defaults.headers.Authorization = `Bearer ${access_token}`
  }

  async profile() {
    return await this.get('profile')
  }

  async updateProfile(data) {
    return await this.put('profile', data)
  }

  async updatePassword(requestBody) {
    console.log('requestBody', requestBody)
    return await this.put('password', requestBody)
  }

  async updatedLogin(dataLogin) {
    return await this.post('login', dataLogin)
  }
}

export default Auth
