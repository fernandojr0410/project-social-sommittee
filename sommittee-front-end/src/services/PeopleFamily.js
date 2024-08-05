import Http from './Http'

class PeopleFamily extends Http {
  constructor() {
    super('peopleFamily')
  }

  async create(data) {
    const response = await this.post('register', data)
    return response
  }
}

export default PeopleFamily
