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
    try {
      const response = API.user.findAll(query)
      console.log('findAll store', response)
      commit('SET_USER_COLABORATOR', response)
      return response
    } catch (error) {
      console.error('Erro findById store', error)
      throw error
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
