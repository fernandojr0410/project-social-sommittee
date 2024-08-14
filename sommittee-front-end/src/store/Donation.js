import API from '@/services/module/API'

const state = {
  donation: [],
}

const mutations = {
  SET_DONATION(state, donation) {
    state.donation = donation
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.donation.find((donation) => donation.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.donation.findAll(query)
    console.log('findAll store', response)
    commit('SET_DONATION', response)
    return response
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
