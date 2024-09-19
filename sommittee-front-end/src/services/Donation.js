import Http from "./Http";

class Donation extends Http {
  constructor() {
    super("donation");
  }

  async findAll(query) {
    return await this.get("", query);
  }

  async create(data) {
    try {
      const response = await this.post("register", data);
      console.log("create service", response);
      return response;
    } catch (error) {
      console.error("erro ao cadastrar service", error);
      throw error;
    }
  }
}

export default Donation;
