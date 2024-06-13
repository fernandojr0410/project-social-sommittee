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

  static async updateUserProfile(token, id, profileData) {
    try {
      return await this.user.put(token, id, profileData)
    } catch (error) {
      throw error
    }
  }

  static async updatedLogin(dataLogin) {
    try {
      return await this.user.updatedLogin(dataLogin)
    } catch (error) {
      throw error
    }
  }
}

export default API
