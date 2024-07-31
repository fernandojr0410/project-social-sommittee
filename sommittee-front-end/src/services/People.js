import Http from './Http'

class People extends Http {
  constructor() {
    super('people')
  }

  async create(data) {
    const response = await this.post('register', data)
    return response
  }

  async findAll(query) {
    const response = await this.get('', query)
    return response
  }

  async findById(id, data) {
    const response = await this.get(id, data)
    console.log('FindById people', response)
    return response
  }

  async update(id, data) {
    const response = await super.patch(id, data)
    console.log('data service:', response)
    return response
  }

  async delete(id) {
    const response = await super.delete(id)
    return response
  }
}

export default People
