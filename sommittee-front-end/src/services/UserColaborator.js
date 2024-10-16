import Http from "./Http";

class UserColaborator extends Http {
  constructor() {
    super("user");
  }

  async findAll(query) {
    return await this.get("", query);
  }

  async create(data) {
    return await this.post("register", data);
  }

  async findById(id, data) {
    return await this.get(id, data);
  }

  async update(id, data) {
    return await this.patch(id, data);
  }

  async delete(id) {
    return await super.delete(id);
  }
}

export default UserColaborator;
