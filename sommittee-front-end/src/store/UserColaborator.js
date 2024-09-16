import API from '@/services/module/API'

const state = {
  user: [],
}

const mutations = {
  SET_USER_COLABORATOR(state, user) {
    state.user = user
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.user.find((user) => user.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = API.user.findAll(query)
    commit('SET_USER_COLABORATOR', response)
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
