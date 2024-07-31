import API from '@/services/module/API'

const state = {
  family: [],
}

const mutations = {
  SET_FAMILY(state, family) {
    state.family = family
    state.filteredFamily = family
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.family.find((family) => family.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.family.findAll(query)
    console.log('Filtered store', response)
    commit('SET_FAMILY', response)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
