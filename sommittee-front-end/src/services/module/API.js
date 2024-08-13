import Auth from '../Auth'
import User from '../User'
import Received from '../Received'
import Address from '../Address'
import People from '../People'
import Cep from '../Cep'
import Family from '../Family'
import PeopleFamily from '../PeopleFamily'
import Donor from '../Donor'
import Product from '../Product'
class API {
  static user = new User()
  static auth = new Auth()
  static received = new Received()
  static people = new People()
  static cep = new Cep()
  static family = new Family()
  static peopleFamily = new PeopleFamily()
  static donor = new Donor()
  static product = new Product()
  static address = new Address()
}

export default API
