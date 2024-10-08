import axios from "axios";
import API from "@/services/module/API";

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, payload) {
    state.user = { ...state.user, ...payload };
  },

  SET_TOKEN(state, token) {
    state.token = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("@sommittee.access_token", token);
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.users.find((user) => user.id === id);
  },
};

const actions = {
  // async login({ commit }, requestBody) {
  //   await API.auth.login(requestBody);
  //   const user = await API.auth.profile();
  //   console.log("user", user);
  //   commit("SET_USER", user);
  //   return user
  // },
  async login({ commit }, requestBody) {
    const response = await API.auth.login(requestBody);
    console.log("Login response:", response);

    if (response.two_factor) {
      return response; // Retorna o 2FA e o user_id para o front-end
    }

    const user = await API.auth.profile();
    commit("SET_USER", user);
    return user;
  },

  async verifyTwoFactor({ commit }, requestBody) {
    try {
      // Verifica o código 2FA e obtém o token de acesso
      const response = await API.auth.verifyTwoFactor(requestBody);
      console.log("Verificação 2FA bem-sucedida:", response);

      const { access_token } = response;

      // Atualiza o axios para usar o token em todas as futuras requisições
      localStorage.setItem("@sommittee.access_token", access_token);
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;

      // Redireciona o usuário para a página Home após a verificação 2FA bem-sucedida
      this.router.push("/");

      // Após o redirecionamento para a Home, obter o perfil do usuário
      const user = await API.auth.profile();
      commit("SET_USER", user);

      return user;
    } catch (error) {
      console.error("Erro durante a verificação 2FA:", error);
      throw new Error("Erro na verificação do código 2FA");
    }
  },

  async fetchUserProfile({ commit }) {
    const user = await API.auth.profile();
    commit("SET_USER", user);
  },

  async fetchUsers({ commit }) {
    try {
      const response = await API.user.getAll();
      commit("SET_USERS", response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  async fetchUser({ commit }) {
    const user = await API.auth.profile();
    commit("SET_USER", user);
  },

  async logout({ commit }) {
    await API.auth.logout();
    commit("SET_USER", null);
    localStorage.removeItem("@sommittee.access_token");
    location.reload();
  },

  async updateProfile({ commit }, payload) {
    const user = await API.auth.updateProfile(payload);
    commit("SET_USER", user);
    return user;
  },

  async updatePassword({ commit }, payload) {
    const response = await API.auth.updatePassword(payload);
    commit("SET_USER", response);
  },

  async uploadAvatar({ commit }, imageFile) {
    try {
      const imageUrl = await API.uploadService.uploadImage(imageFile);

      const updatedUser = await API.storageService.updateAvatar(imageUrl);

      commit("SET_USER", updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
