import Http from './Http'

class Family extends Http {
  constructor() {
    super('family')
  }

  async findAll(query) {
    const response = await this.get('', query)
    console.log('response service', response)
    return response
  }
}

export default Family
