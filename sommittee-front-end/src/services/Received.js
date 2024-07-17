import Http from './Http'

class Received extends Http {
  constructor() {
    super('received')
  }

  async findAll(data) {
    const response = await this.get(data)
    return response
  }

  async findById(id, data) {
    const response = await this.get(id, data)
    console.log('FindById received', response)
    return response
  }

  async update(id, data) {
    const response = await this.patch(id, data)
    console.log('Dados atualizados', response)
    return response
  }
}

export default Received
