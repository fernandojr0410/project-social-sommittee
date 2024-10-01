import Http from './Http'

class User extends Http {
  constructor() {
    super('users')
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async update(id, data) {
    const response = await this.patch(`${id}`, data)
    return response.data
  }
}

export default User
