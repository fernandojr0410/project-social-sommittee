import axios from "axios";
import Http from "./Http";

class User extends Http {

  constructor() {
    super('users/');
  }

  async login(data) {
    const { access_token } = await this.post('login', data)
    localStorage.setItem('@sommittee.access_token', access_token)
    axios.defaults.headers.Authorization = `Bearer ${access_token}`
  }
}

export default User;
