import Http from './Http'

class Address extends Http {
  constructor() {
    super('address')
  }

  async findAll(query) {
    return await this.get('', query)
  }
}

export default Address
