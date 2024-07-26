import Http from './Http'

class Received extends Http {
  constructor() {
    super('received')
  }

  async findAll(data) {
    const response = await this.get(data)
    console.log('FindAll received', response)
    return response
  }

  async findById(id, data) {
    const response = await this.get(id, data)
    return response
  }

  async update(id, data) {
    const response = await super.patch(id, data)
    return response
  }
}

export default Received
