import Http from './Http'

class AuthService extends Http {
  constructor () {
    super('/auth')
  }
}

export default new AuthService()