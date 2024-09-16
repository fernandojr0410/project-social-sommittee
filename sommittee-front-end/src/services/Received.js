import Http from './Http'

class Received extends Http {
  constructor() {
    super('received')
  }

  async create(data) {
    return await this.post('register', data)
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async findById(id, data) {
    try {
      const response = await this.get(id, data)
      console.log('findById service', response)
      return response
    } catch (error) {
      console.error('erro ao fitlrar ID service', error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const response = await this.patch(id, data)
      console.log('update service', response)
      return response
    } catch (error) {
      console.error('erro ao atualizar service', error)
      throw error
    }
  }
}

export default Received
