import Http from './Http'

class Address extends Http {
  constructor() {
    super('address')
  }

  async create(data) {
    const response = await this.post('register', data)
    return response
  }

  async findAll(data) {
    const response = await this.get(data)
    return response
  }

  async findById(id, data) {
    const response = await this.get(id, data)
    return response
  }

  async filter(params) {
    try {
      if (typeof params !== 'object') {
        throw new Error('Query parameter must be an object')
      }
      const response = await super.filter('filter', params)
      console.log('response service:', response)
      return response
    } catch (error) {
      console.error('Erro ao filtrar endereços:', error)
      throw error
    }
  }

  async update(id, data) {
    const response = await this.patch(id, data)
    return response
  }
}

export default Address
