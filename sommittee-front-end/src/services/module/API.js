import User from '../User'

class API {
  static user = new User()

  static async getUserProfile(token) {
    try {
      return await this.user.profile(token)
    } catch (error) {
      throw error
    }
  }
}

export default API
