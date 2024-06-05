import axios from 'axios'

axios.defaults.timeout = 300000
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  '@sommittee.access_token'
)}`
class Http {

  constructor(path) {
    this.path = path
  }

  HTTP_CONFIG = {
    "Content-type": "application/json",
    'Authorization': 'Bearer ' + this.token,
  }

  loggout() {
    localStorage.removeItem('@sommittee.access_token')
    window.location.reload(); 
  }

  checkExpires(error) {
    if (error.response && error.response.data.type === 'expires_token') {
      this.loggout()
    }
  }

  async post(path, body) {
    try {
      const { data } = await axios.post(this.path + (path || ""), body, this.HTTP_CONFIG)
      return data
    } catch (error) {
      this.checkExpires(error)
      throw error;
    }
  }

}

export default Http