import Http from "./Http";

class Logger extends Http {
  constructor() {
    super("log");
  }

  async findAll(query) {
    return await this.get("/", query);
  }
}

export default Logger;
