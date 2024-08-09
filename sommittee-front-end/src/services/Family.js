import Http from './Http'

class Family extends Http {
  constructor() {
    super('family')
  }

  async create(data) {
    const response = await this.post('register', data)
    console.log('response service family', response)
    return response
  }

  async findAll(query) {
    const response = await this.get('', query)
    console.log('findAll response:', response);

    return response
  }

  async findById(id, data) {
      const response = await this.get(id, data)
      return response
  }

  async update(id, data) {
      const response = await this.patch(id, data)
      return response
  }

  async delete(id) {
    const response = await super.delete(id)
    return response 
  }
}

export default Family
