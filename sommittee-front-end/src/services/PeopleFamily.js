import Http from './Http'

class PeopleFamily extends Http {
  constructor() {
    super('peopleFamily')
  }

  async findAll() {
    return await this.get()
  }

  async create(data) {
    return await this.post('register', data)
  }
}

export default PeopleFamily
