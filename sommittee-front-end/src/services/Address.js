import Http from './Http'

class Address extends Http {
  constructor() {
    super('address')
  }

  async findAll(query) {
    const response = await this.get('', query)
    console.log('response service', response)
    return response
  }
}

export default Address
