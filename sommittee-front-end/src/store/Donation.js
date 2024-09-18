import API from "@/services/module/API";

const state = {
  donation: [],
};

const mutations = {
  SET_DONATION(state, donation) {
    state.donation = donation;
  },
  CREATE_DONATION(state, newDonation) {
    state.donation.push(newDonation);
  },
};

const getters = {
  getById: (state) => {
    return (id) => state.donation.find((donation) => donation.id === id);
  },
};

const actions = {
  async findAll({ commit }, query) {
    const response = await API.donation.findAll(query);
    commit("SET_DONATION", response);
    return response;
  },

  async create({ commit }, data) {
    const response = await API.donation.create(data);
    console.log("create store", response);
    commit("CREATE_DONATION", response);
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
