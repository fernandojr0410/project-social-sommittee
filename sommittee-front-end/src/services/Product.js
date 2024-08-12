import Http from './Http'

class Product extends Http {
  constructor() {
    super('product')
  }

  async findAll(query) {
    const response = await this.get('', query)
    console.log('response service', response)
    return response
  }
}

export default Product
