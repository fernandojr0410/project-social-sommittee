import Http from './Http'

class Received extends Http {
  constructor() {
    super('received')
  }

  async findAll(data) {
    return await this.get(data)
  }

  async findById(id, data) {
    return await this.get(id, data)
  }

  async update(id, data) {
    return await super.patch(id, data)
  }
}

export default Received
