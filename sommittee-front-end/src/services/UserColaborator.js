import Http from "./Http";

class UserColaborator extends Http {
  constructor() {
    super("user");
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
      console.error("erro create service", error);
      throw error;
    }
  }
}

export default UserColaborator;
