import Auth from '../Auth'
import User from '../User'
import Received from '../Received'
class API {
  static user = new User()
  static auth = new Auth()
  static received = new Received()
}

export default API
