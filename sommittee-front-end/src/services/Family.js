import Http from './Http'

class Family extends Http {
  constructor() {
    super('family')
  }

  async create(data) {
    const response = await this.post('register', data)
    console.log("response service family", response)
    return response
  }

  async findAll(query) {
    const response = await this.get('', query)
    return response
  }

  async findById(id, data) {
    try {
      console.log('ID service antes', id)
      const response = await this.get(id, data)
      console.log('FindById response', response)
      console.log('ID service depois', response.id)
      return response
    } catch (error) {
      console.error('Erro ao buscar por ID:', error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const response = await this.patch(id, data)
      console.log('update response', response)
      return response
    } catch (error) {
      console.error('Erro ao buscar por ID:', error)
      throw error
    }
  }
}

export default Family
