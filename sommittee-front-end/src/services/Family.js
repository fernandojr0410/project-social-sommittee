import Http from './Http'

class Family extends Http {
  constructor() {
    super('family')
  }

  async create(data) {
    return await this.post('register', data)
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async findById(id, data) {
    // return await this.get(id, data)
    const response = await this.get(id, data)
    console.log("findById service", response)
    return response
  }

  async update(id, data) {
    return await this.patch(id, data)
  }

  async delete(id) {
    return await super.delete(id)
  }
}

export default Family
