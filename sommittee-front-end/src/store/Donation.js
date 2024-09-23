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
    try {
      const response = await API.donation.findById(id);
      console.log("findById store", response);
      commit("UPDATE_DONATION", response);
      return response;
    } catch (error) {
      console.error("error filtering store", error);
      throw error;
    }
  },

  async update({commit}, {id, payload}) {
    try {
      const response = await API.donation.update(id, payload)
      console.log("update store", response)
      commit('UPDATE_DONATION', response)
      return response
    } catch (error) {
      console.error('error updated store', error)
      throw error
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
