import API from "@/services/module/API";

const state = {
  product: [],
};

const mutations = {
  CREATE_PRODUCT(state, newProduct) {
    state.product.push(newProduct);
  },

  SET_DASHBOARD_DATA(state, dashboardData) {
    state.product = dashboardData;
  },

  SET_PRODUCT(state, product) {
    state.product = product;
  },

  UPDATE_PRODUCT(state, updatedProduct) {
    state.product = state.product.map((item) => {
      return item.id === updatedProduct.id
        ? { ...item, ...updatedProduct }
        : item;
    });
  },

  DELETE_PRODUCT(state, id) {
    state.product = state.product.filter((product) => product.id !== id);
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.product.find((product) => product.id === id);
  },

  dashboardProducts: (state) => {
    return state.product;
  },
};

const actions = {
  async fetchDashboardData({ commit }, category) {
    try {
      const response = await API.product.getDashboardData(category);
      commit("SET_DASHBOARD_DATA", response);
      return response;
    } catch (error) {
      console.error("Erro ao buscar dados da dashboard:", error);
      throw error;
    }
  },

  async create({ commit }, payload) {
    const response = await API.product.create(payload);
    commit("CREATE_PRODUCT", response);
    return response;
  },

  async findAll({ commit }, query) {
    const response = await API.product.findAll(query);
    commit("SET_PRODUCT", response);
    return response;
  },

  async findById({ commit }, id) {
    const response = await API.product.findById(id);
    commit("UPDATE_PRODUCT", response);
    return response;
  },

  async update({ commit }, { id, payload }) {
    const response = await API.product.update(id, payload);
    commit("UPDATE_PRODUCT", response);
    return response;
  },

  async delete({ commit }, id) {
    const response = await API.product.delete(id);
    commit("DELETE_PRODUCT", id);
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
