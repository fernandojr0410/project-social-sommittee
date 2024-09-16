import API from "@/services/module/API";

const state = {
  received: [],
};

const mutations = {
  CREATE_RECEIVED(state, newReceived) {
    state.received.push(newReceived);
  },

  SET_RECEIVED(state, received) {
    state.received = received;
  },

  UPDATE_RECEIVED(state, updatedReceived) {
    state.received = state.received.map((item) => {
      return item.id === updatedReceived.id
        ? { ...item, ...updatedReceived }
        : item;
    });
  },

  DELETE_RECEIVED(state, id) {
    state.received = state.received.filter((received) => received.id !== id);
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.received.find((received) => received.id === id);
  },
};

const actions = {
  async create({ commit }, payload) {
    const response = await API.received.create(payload);
    commit("CREATE_RECEIVED", response);
    return response;
  },

  async findAll({ commit }, query) {
    const response = await API.received.findAll(query);
    commit("SET_RECEIVED", response);
    return response;
  },

  async findById({ commit }, id) {
    const response = await API.received.findById(id);
    commit("UPDATE_RECEIVED", response);
    return response;
  },

  async update({ commit }, { id, payload }) {
    const response = await API.received.update(id, payload);
    commit("UPDATE_RECEIVED", response);
    return response;
  },

  async delete({ commit }, id) {
    const response = await API.received.delete(id);
    commit("DELETE_RECEIVED", id);
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
