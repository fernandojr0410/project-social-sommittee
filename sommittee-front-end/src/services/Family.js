import Http from './Http'

class Family extends Http {
  constructor() {
    super('family')
  }

  async create(data) {
    const response = await this.post('register', data)
    return response.data || response
  }

  async findAll(query) {
    const response = await this.get('', query)
    return response
  }
}

export default Family
