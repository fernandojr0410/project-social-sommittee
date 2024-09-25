import API from "@/services/module/API";
import { updateLocale } from "moment";

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
  UPDATE_DONATION(state, updatedDonation) {
    state.donation = state.donation.map((item) => {
      return item.id === updatedDonation.id
        ? { ...item, ...updatedDonation }
        : item;
    });
  },
  DELETE_DONATION(state, id) {
    state.donation = state.donation.filter((donation) => donation.id !== id);
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
    commit("CREATE_DONATION", response);
    return response;
  },

  async findById({ commit }, id) {
    const response = await API.donation.findById(id);
    commit("UPDATE_DONATION", response);
    return response;
  },

  async update({ commit }, { id, payload }) {
    const response = await API.donation.update(id, payload);
    commit("UPDATE_DONATION", response);
    return response;
  },

  async delete({ commit }, id) {
    const response = await API.donation.delete(id);
    commit("DELETE_DONATION", id);
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
