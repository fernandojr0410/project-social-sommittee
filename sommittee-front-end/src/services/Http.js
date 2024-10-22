import axios from "axios";
import store from "@/store";

// axios.defaults.timeout = 60000;
axios.defaults.timeout = 24 * 60 * 60 * 1000;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

class Http {
  constructor(path) {
    this.path = path;
  }

  get HTTP_CONFIG() {
    const token = localStorage.getItem("@sommittee.access_token");
    return {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  logout() {
    localStorage.removeItem("@sommittee.access_token");
    store.dispatch("auth/setSessionExpired", true);
  }

  checkExpires(error) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      this.logout();
    }
  }

  async post(path, body, options = { headers: {} }) {
    try {
      const { data } = await axios.post(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        body,
        {
          headers: {
            ...this.HTTP_CONFIG,
            ...((options || {}).headers || {}),
          },
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async get(path, params = {}) {
    try {
      const { data } = await axios.get(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        {
          headers: this.HTTP_CONFIG,
          params,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async patch(path, body, params = {}) {
    try {
      const { data } = await axios.patch(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        body,
        {
          headers: this.HTTP_CONFIG,
          params,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async delete(path = "") {
    try {
      const { data } = await axios.delete(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        {
          headers: this.HTTP_CONFIG,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }
}

export default Http;
