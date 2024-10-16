import axios from "axios";
import Http from "./Http";

class Auth extends Http {
  constructor() {
    super("users/auth");
  }

  async login(data) {
    const response = await this.post("login", data);
    return response;
  }

  async verifyTwoFactor(data) {
    const { access_token } = await this.post("verify-2fa", data);

    localStorage.setItem("@sommittee.access_token", access_token);
    axios.defaults.headers.Authorization = `Bearer ${access_token}`;
    return { access_token };
  }

  async sendSms(data) {
    return await this.post("send-sms", data);
  }

  async verifySmsCode(data) {
    return await this.post("verify-sms", data);
  }

  async profile() {
    return await this.get("profile");
  }

  async updateProfile(data) {
    return await this.patch("profile", data);
  }

  async updatePassword(requestBody) {
    return await this.patch("password", requestBody);
  }

  async updatedLogin(dataLogin) {
    return await this.post("login", dataLogin);
  }

  async logout() {
    const accessToken = localStorage.getItem("@sommittee.access_token");
    if (!accessToken) {
      throw new Error("Nenhum token de acesso encontrado!");
    }
    await this.post("logout", {});
    localStorage.removeItem("@sommittee.access_token");
    delete axios.defaults.headers.Authorization;
  }
}

export default Auth;
