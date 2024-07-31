import Auth from '../Auth'
import User from '../User'
import Received from '../Received'
// import Address from '../Address'
import People from '../People'
import Cep from '../Cep'
import Family from '../Family'
class API {
  static user = new User()
  static auth = new Auth()
  static received = new Received()
  // static address = new Address()
  static people = new People()
  static cep = new Cep()
  static family = new Family()
}

export default API
