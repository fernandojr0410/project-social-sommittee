import Http from "./Http";

class Donation extends Http {
  constructor() {
    super("donation");
  }

  async findAll(query) {
    return await this.get("", query);
  }

  async create(data) {
    return await this.post("register", data);
  }

  async findById(id, data) {
    try {
      const response = await this.get(id, data);
      console.log("findById service", response);
      return response;
    } catch (error) {
      console.error("error filtering service", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.patch(id, data);
      console.log("update service", response);
      return response;
    } catch (error) {
      console.error("error updated service", error);
      throw error;
    }
  }
}

export default Donation;
