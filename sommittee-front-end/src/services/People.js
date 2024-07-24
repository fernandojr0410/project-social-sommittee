import Http from './Http'

class People extends Http {
  constructor() {
    super('people')
  }

  async findAll(data) {
    const response = await this.get(data)
    return response
  }

  async findById(id, data) {
    const response = await this.get(id, data)
    return response
  }

  async update(id, data) {
    const response = await this.patch(id, data)
    console.log('dados service:', response)
    return response
  }
}

export default People
