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
    try {
      const response = await API.userColaborator.create(data);
      console.log("create store", response);
      commit("CREATE_USER", response);
      return response;
    } catch (error) {
      console.error("erro create store", error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
