import Http from './Http'

class Cep extends Http {
  constructor() {
    super('cep')
  }

  async getAddressByZipcode(zipCode) {
    try {
      const cep = await this.get(`${zipCode}`)
      console.log('cep', cep)
      return cep
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP:', error)
      throw error
    }
  }
}

export default Cep
