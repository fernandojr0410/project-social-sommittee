import Http from './Http'

class PeopleFamily extends Http {
  constructor() {
    super('peopleFamily')
  }

  // async findAll(data) {
  //   const response = await this.get(data)
  //   console.log('findAll service', response)
  //   return response
  // }
  async findAll() {
    try {
      const response = await this.get()
      console.log('findAll service', response)
      return response
    } catch (error) {
      console.error('Erro ao buscar todos:', error)
      throw error
    }
  }

  async create(data) {
    const response = await this.post('register', data)
    return response
  }
}

export default PeopleFamily
