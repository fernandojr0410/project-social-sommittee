import Http from './Http'

class Donor extends Http {
  constructor() {
    super('donor')
  }

  async create(data) {
    return await this.post('register', data)
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async findById(id, data) {
    return await this.get(id, data)
  }

  async update(id, data) {
    return await this.patch(id, data)
  }

  async delete(id) {
    return await super.delete(id)
  }
}

export default Donor
