import API from '@/services/module/API'

const state = {
  address: [],
}

const mutations = {
  SET_ADDRESS(state, address) {
    state.address = address
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.address.find((address) => address.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.address.findAll(query)
    commit('SET_ADDRESS', response)
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
