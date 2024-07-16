import Http from './Http'

class Receipt extends Http {
  constructor() {
    super('received')
  }

  async findAll(data) {
    const response = await this.get(data)
    console.log('FindAll received:', response)
    return response
  }
}

export default Receipt
