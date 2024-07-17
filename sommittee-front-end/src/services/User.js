import axios from 'axios'
import Http from './Http'

class User extends Http {
  constructor() {
    super('users')
  }

  async update(id, data) {
    const response = await this.put(`${id}`, data)
    return response.data
  }
}

export default User
