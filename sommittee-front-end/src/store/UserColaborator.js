import API from "@/services/module/API";

const state = {
  user: [],
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  CREATE_USER(state, newUser) {
    state.user.push(newUser);
  },

  UPDATE_USER(state, updatedUser) {
    state.user = state.user.map((item) => {
      return item.id === updatedUser.id ? { ...item, ...updatedUser } : item;
    });
  },

  DELETE_USER(state, id) {
    state.user = state.user.filter((item) => item.id !== id);
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.user.find((user) => user.id === id);
  },
};

const actions = {
  async findAll({ commit }, query) {
    const response = await API.userColaborator.findAll(query);
    commit("SET_USER", response);
    return response;
  },

  async create({ commit }, data) {
    const response = await API.userColaborator.create(data);
    commit("CREATE_USER", response);
    return response;
  },

  async findById({ commit }, id) {
    const response = await API.userColaborator.findById(id);
    commit("UPDATE_USER", response);
    return response;
  },

  async update({ commit }, { id, payload }) {
    const response = await API.userColaborator.update(id, payload);
    commit("UPDATE_USER", response);
    return response;
  },

  async delete({ commit }, id) {
    const response = await API.userColaborator.delete(id);
    commit("DELETE_USER", id);
    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
