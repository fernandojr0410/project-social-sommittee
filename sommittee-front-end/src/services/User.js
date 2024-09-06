import Http from './Http'

class User extends Http {
  constructor() {
    super('users')
  }

  async findAll(query) {
    try {
      const response = await this.get('', query)
      console.log('findAll users', response)
      return response
    } catch (error) {
      console.error('Erro users service', error)
      throw error
    }
  }

  async update(id, data) {
    const response = await this.put(`${id}`, data)
    return response.data
  }
}

export default User
