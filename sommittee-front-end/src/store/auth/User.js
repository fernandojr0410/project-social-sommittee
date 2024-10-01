import API from "@/services/module/API";

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, payload) {
    state.user = { ...state.user, ...payload };
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.users.find((user) => user.id === id);
  },
};

const actions = {
  async login({ commit }, requestBody) {
    await API.auth.login(requestBody);
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
