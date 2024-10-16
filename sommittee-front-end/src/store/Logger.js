import API from "@/services/module/API";

const state = {
  log: [],
};

const mutations = {
  USE_LOG(state, log) {
    state.log = log;
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.log.find((log) => log.id === id);
  },
};

const actions = {
  async findAll({ commit }, query) {
    const response = await API.logger.findAll(query);
    commit("USE_LOG", response);
    return response;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
