import axios from "axios";
import router from "@/router";
import API from "@/services/module/API";

const state = {
  user: null,
  sessionExpired: false,
  token: localStorage.getItem("@sommittee.access_token") || null,
};

const mutations = {
  SET_SESSION_EXPIRED(state, value) {
    state.sessionExpired = value;
  },

  SET_USER(state, payload) {
    state.user = { ...state.user, ...payload };
  },

  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.users.find((user) => user.id === id);
  },
};

const actions = {
  setSessionExpired({ commit }, value) {
    commit("SET_SESSION_EXPIRED", value);
    if (value) {
      commit("SET_USER", null);
      commit("SET_TOKEN", null);
      localStorage.removeItem("@sommittee.access_token");
    }
  },

  async login({ commit }, requestBody) {
    const response = await API.auth.login(requestBody);
    console.log("Login response:", response);

    if (response.two_factor) {
      return response;
    }

    const user = await API.auth.profile();
    commit("SET_USER", user);
    return user;
  },

  async verifyTwoFactor({ commit }, requestBody) {
    try {
      const response = await API.auth.verifyTwoFactor(requestBody);

      await API.auth.sendSms({ user_id: requestBody.user_id });

      return { success: true };
    } catch (error) {
      console.error("Erro durante a verificação 2FA:", error);
      throw new Error("Erro na verificação do código 2FA");
    }
  },

  async verifySmsCode({ commit }, requestBody) {
    try {
      const response = await API.auth.verifySmsCode(requestBody);

      const { access_token } = response;

      if (access_token) {
        localStorage.setItem("@sommittee.access_token", access_token);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${access_token}`;

        const user = await API.auth.profile();
        commit("SET_USER", user);

        return { success: true };
      } else {
        throw new Error("Token não encontrado");
      }
    } catch (error) {
      console.error("Erro na verificação do código SMS:", error);
      throw error;
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
    const token = localStorage.getItem("@sommittee.access_token");
    if (token) {
      commit("SET_TOKEN", token);
      try {
        const user = await Auth.profile();
        commit("SET_USER", user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          commit("SET_USER", null);
          commit("SET_TOKEN", null);
          localStorage.removeItem("@sommittee.access_token");
        } else {
          console.error("Erro ao buscar o perfil do usuário:", error);
        }
      }
    }
  },

  async logout({ commit }) {
    await API.auth.logout();
    commit("SET_USER", null);
    localStorage.removeItem("@sommittee.access_token");
    location.reload();
  },

  setSessionExpired({ commit }, value) {
    if (value) {
      localStorage.removeItem("@sommittee.access_token");
      commit("SET_USER", null);
    }
    commit("SET_SESSION_EXPIRED", value);
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
