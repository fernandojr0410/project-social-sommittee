import API from '@/services/module/API'

const state = {
  donor: [],
}

const mutations = {
  CREATE_DONOR(state, newDonor) {
    state.donor.push(newDonor)
  },

  SET_DONOR(state, donor) {
    state.donor = donor
  },

  UPDATE_DONOR(state, updatedDonor) {
    state.donor = state.donor.map((item) => {
      return item.id === updatedDonor.id ? { ...item, ...updatedDonor } : item
    })
  },

  DELETE_DONOR(state, id) {
    state.donor = state.donor.filter((donor) => donor.id !== id)
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.donor.find((donor) => donor.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.donor.findAll(query)
    commit('SET_DONOR', response)
    return response
  },

  async create({ commit }, payload) {
    const response = await API.donor.create(payload)
    commit('CREATE_DONOR', response)
    return response
  },

  async findById({ commit }, id) {
    const response = await API.donor.findById(id)
    commit('UPDATE_DONOR', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.donor.update(id, payload)
    commit('UPDATE_DONOR', response)
    return response
  },

  async delete({ commit }, id) {
    const response = await API.donor.delete(id)
    commit('DELETE_DONOR', id)
    return response
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
