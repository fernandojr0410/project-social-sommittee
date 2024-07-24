import Auth from '../Auth'
import User from '../User'
import Received from '../Received'
import Address from '../Address'
import People from '../People'
class API {
  static user = new User()
  static auth = new Auth()
  static received = new Received()
  static address = new Address()
  static people = new People()
}

export default API
