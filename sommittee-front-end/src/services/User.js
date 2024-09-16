import Http from './Http'

class User extends Http {
  constructor() {
    super('users')
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async update(id, data) {
    const response = await this.put(`${id}`, data)
    return response.data
  }
}

export default User
