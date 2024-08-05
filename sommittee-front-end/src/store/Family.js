import API from '@/services/module/API'

const state = {
  family: [],
}

const mutations = {
  CREATE_FAMILY(state, newFamily) {
    if (newFamily && !Array.isArray(newFamily)) {
      state.family.push(newFamily)
    }
  },
  SET_FAMILY(state, family) {
    if (Array.isArray(family)) {
      state.family = family
      state.filteredFamily = family
    }
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.family.find((family) => family.id === id)
  },
}

const actions = {
  async create({ commit }, payload) {
    const response = await API.family.create(payload)
    commit('CREATE_FAMILY', response)
  },
  async findAll({ commit }, query) {
    const response = await API.family.findAll(query)
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
