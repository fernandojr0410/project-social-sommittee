import API from '@/services/module/API'

const state = {
  product: [],
}

const mutations = {
  CREATE_PRODUCT(state, newProduct) {
    state.product.push(newProduct)
  },

  SET_PRODUCT(state, product) {
    state.product = product
  },

  UPDATE_PRODUCT(state, updatedProduct) {
    state.product = state.product.map((item) => {
      return item.id === updatedProduct.id
        ? { ...item, ...updatedProduct }
        : item
    })
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.product.find((product) => product.id === id)
  },
}

const actions = {
  async create({ commit }, payload) {
    const response = await API.product.post(payload)
    console.log('create store', response)
    commit('CREATE_PRODUCT', response)
    return response
  },

  async findAll({ commit }, query) {
    const response = await API.product.findAll(query)
    commit('SET_PRODUCT', response)
    return response
  },

  async findById({ commit }, id) {
    const response = await API.product.findById(id)
    console.log('findById store', response)
    commit('UPDATE_PRODUCT', response)
    
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.product.update(id, payload)
    console.log('update store', response)
    commit('UPDATE_PRODUCT', response)
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
