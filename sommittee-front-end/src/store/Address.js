import API from '@/services/module/API'

const state = {
  address: [],
  filteredAddress: [],
}

const mutations = {
  CREATE_ADDRESS(state, newAddress) {
    state.address.push(newAddress)
  },

  SET_ADDRESS(state, address) {
    state.address = address
  },

  UPDATE_ADDRESS(state, updatedAddress) {
    state.address = state.address.map((item) => {
      return item.id === updatedAddress.id
        ? { ...item, ...updatedAddress }
        : item
    })
  },
  FILTER_ADDRESS(state, filteredAddress) {
    state.filteredAddress = filteredAddress
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.address.find((address) => address.id === id)
  },
  filteredAddress: (state) => state.filteredAddress,
}

const actions = {
  async create({ commit }, payload) {
    const response = await API.address.create(payload)
    console.log('Resposta ao criar endereço:', response)
    commit('CREATE_ADDRESS', response)
  },

  async findAll({ commit }) {
    const response = await API.address.findAll()
    commit('SET_ADDRESS', Array.isArray(response) ? response : [])
  },

  async findById({ commit }, id) {
    const response = await API.address.findById(id)
    commit('UPDATE_ADDRESS', response)
    return response
  },

  async filter({ commit }, payload) {
    try {
      const response = await API.address.filter(payload)
      commit('FILTER_ADDRESS', response)
      console.log('Response:', response)
    } catch (error) {
      console.error('Erro ao filtrar endereços:', error)
      throw error
    }
  },

  async update({ commit }, { id, payload }) {
    const response = await API.address.update(id, payload)
    commit('UPDATE_ADDRESS', response)
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
