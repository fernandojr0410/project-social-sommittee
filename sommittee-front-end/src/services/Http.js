// import axios from 'axios'

// axios.defaults.timeout = 300000
// axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
//   '@sommittee.access_token'
// )}`
// class Http {
//   constructor(path) {
//     this.path = path
//   }

//   HTTP_CONFIG = {
//     'Content-type': 'application/json',
//     Authorization: 'Bearer ' + this.token,
//   }

//   loggout() {
//     localStorage.removeItem('@sommittee.access_token')
//     window.location.reload()
//   }

//   checkExpires(error) {
//     if (error.response && error.response.data.type === 'expires_token') {
//       this.loggout()
//     }
//   }

//   async post(path, body) {
//     try {
//       const { data } = await axios.post(this.path + (path || ''), body, {
//         headers: this.HTTP_CONFIG,
//       })
//       return data
//     } catch (error) {
//       this.checkExpires(error)
//       throw error
//     }
//   }

//   async get(path, params = {}) {
//     try {
//       const { data } = await axios.get(this.path + (path || ''), params, {
//         headers: this.HTTP_CONFIG,
//       })
//       return data
//     } catch (error) {
//       this.checkExpires(error)
//       throw error
//     }
//   }
// }

// export default Http

import axios from 'axios'

// axios.defaults.timeout = 300000
axios.defaults.timeout = 24 * 60 * 60 * 1000
axios.defaults.baseURL = process.env.VUE_APP_API_URL

class Http {
  constructor(path) {
    this.path = path
  }

  get HTTP_CONFIG() {
    const token = localStorage.getItem('@sommittee.access_token')
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  loggout() {
    localStorage.removeItem('@sommittee.access_token')
    window.location.reload()
  }

  checkExpires(error) {
    if (error.response && error.response.data.type === 'expires_token') {
      this.loggout()
    }
  }

  async post(path, body) {
    try {
      const { data } = await axios.post(this.path + (path || ''), body, {
        headers: this.HTTP_CONFIG,
      })
      return data
    } catch (error) {
      this.checkExpires(error)
      throw error
    }
  }

  async get(path, params = {}) {
    try {
      const { data } = await axios.get(this.path + (path || ''), {
        headers: this.HTTP_CONFIG,
        params,
      })
      return data
    } catch (error) {
      this.checkExpires(error)
      throw error
    }
  }

  async put(path, body, params = {}) {
    try {
      const { data } = await axios.put(this.path + (path || ''), body, {
        headers: this.HTTP_CONFIG,
        params,
      })
      console.log("data http", data)
      return data
    } catch (error) {
      console.log("erro http", error)
      this.checkExpires(error)
      throw error
    }
  }
}

export default Http
