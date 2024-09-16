import Auth from '../Auth'
import User from '../User'
import Received from '../Received'
import People from '../People'
import Cep from '../Cep'
import Family from '../Family'
import PeopleFamily from '../PeopleFamily'
import Donor from '../Donor'
import Donation from '../Donation'
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
  static donation = new Donation()
  static product = new Product()
}

export default API
