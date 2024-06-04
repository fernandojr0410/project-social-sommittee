import axios from 'axios'
import qs from 'qs'

class Http {
  constructor(path) {
    this.path = path
  }

  loggout() {
    localStorage.removeItem('jwt_token')
    localStorage.reload()
  }

  checkExpires ({ response }) {
    if(response.data.type === 'expires_token') {
      this.loggout
    }
  }

  async index(path) {
    try {
      const { data } = await axios.get(this.path + (typeof path === 'string' ? path : (typeof path === 'object' ? `?${qs.stringify(path)}` : '')))
      return data
    } catch (e) {
      this.checkExpires(e)
      throw new Error(e.response.error)
    }
  }

  async show (id = '') {
    try {
      const { data } = await axios.get(this.path + (id[0] !== '/' ? '/' : '') + id)
      return data
    } catch (e) {
      this.checkExpires(e)
      throw new Error(e.response.data.error)
    }
  }

  async store (path, payload, headers) {
    try {
      const { data } = await axios.post(this.path + (typeof path === 'string' ? (path[0] === '/' ? path : `/${path}`) : ''), payload || path, headers || {})
      return data
    } catch (e) {
      this.checkExpires(e)
      throw new Error(e.response.data.error)
    }
  }

  async update (id, payload) {
    try {
      const { data } = await axios.put(this.path + (id[0] !== '/' ? '/' : '') + id, payload)
      return data
    } catch (e) {
      this.checkExpires(e)
      throw new Error(e.response.data.error)
    }
  }

  async destroy (id) {
    try {
      const { data } = await axios.delete(this.path + (id ? ((id[0] !== '/' ? '/' : '') + id) : ''))
      return data
    } catch (e) {
      this.checkExpires(e)
      throw new Error(e.response.data.error)
    }
  }
}

export default Http