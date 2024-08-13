import API from '@/services/module/API'

const state = {
  product: [],
}

const mutations = {
  SET_PRODUCT(state, product) {
    state.product = product
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.product.find((product) => product.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.product.findAll(query)
    commit('SET_PRODUCT', response)
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
