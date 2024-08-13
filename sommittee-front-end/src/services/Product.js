import Http from './Http'

class Product extends Http {
  constructor() {
    super('product')
  }

  async findAll(query) {
    return await this.get('', query)
  }
}

export default Product
