import Http from './Http'

class Product extends Http {
  constructor() {
    super('product')
  }

  async create(data) {
    const response = await this.post('register', data)
    console.log('create service', store)
    return response
  }

  async findAll(query) {
    return await this.get('', query)
  }

  async findById(id, data) {
    // return await this.get(id, data)
    const response = await this.get(id, data)
    console.log('findById service', response)
    return response
  }

  async update(id, data) {
    // return await this.patch(id, data)
    const response = await this.patch(id, data)
    console.log('update service', response)
    return response
  }
}

export default Product
