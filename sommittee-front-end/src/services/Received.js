import Http from "./Http";

class Received extends Http {
  constructor() {
    super("received");
  }

  async create(data) {
    return await this.post("register", data);
  }

  async getLatestReceived() {
    return await this.get("latest");
  }

  async findAll(query) {
    return await this.get("", query);
  }

  async findById(id, data) {
    return await this.get(id, data);
  }

  async update(id, data) {
    return await this.patch(id, data);
  }

  async remove(id) {
    return await super.delete(id);
  }
}

export default Received;
