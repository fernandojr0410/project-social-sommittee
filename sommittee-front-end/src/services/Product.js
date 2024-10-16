import Http from "./Http";

class Product extends Http {
  constructor() {
    super("product");
  }

  async getDashboardData(category) {
    return await this.get(`dashboard/${category}`);
  }

  async create(data) {
    return await this.post("register", data);
  }

  async findAll(query) {
    return await this.get("", query);
  }

  async getDashboardData() {
    return await this.get("dashboard");
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

export default Product;
