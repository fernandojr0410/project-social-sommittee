import Auth from "../Auth";

import Received from "../Received";
import People from "../People";
import Cep from "../Cep";
import Family from "../Family";
import PeopleFamily from "../PeopleFamily";
import Donor from "../Donor";
import Donation from "../Donation";
import Product from "../Product";
import UploadService from "../Upload";
import StorageService from "../Storage";
import UserColaborator from "../UserColaborator";

class API {
  static auth = new Auth();
  static received = new Received();
  static people = new People();
  static cep = new Cep();
  static family = new Family();
  static peopleFamily = new PeopleFamily();
  static donor = new Donor();
  static donation = new Donation();
  static product = new Product();
  static uploadService = new UploadService();
  static storageService = new StorageService();
  static userColaborator = new UserColaborator();
}

export default API;
