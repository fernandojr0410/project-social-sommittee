import Http from './Http'

class Donation extends Http {
  constructor() {
    super('donation')
  }

  async findAll(query) {
    const response = await this.get('', query)
    console.log('findAll service', response)
    return response
  }
}

export default Donation
