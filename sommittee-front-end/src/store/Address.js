import API from '@/services/module/API'

const state = {
  address: [],
  filteredAddress: [],
  searchCategory: '',
  searchTerm: '',
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

  SET_ALL_ADDRESS(state, addresses) {
    state.allAddresses = addresses
    state.filteredAddress = addresses
  },

  SET_FILTER_ADDRESS(state, filteredAddress) {
    state.filteredAddress = filteredAddress
  },

  SET_SEARCH_CATEGORY(state, category) {
    state.searchCategory = category
  },

  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term
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

  async fetchAllAddresses({ commit }) {
    try {
      const response = await API.address.findAll()
      commit('SET_ALL_ADDRESS', response)
      commit('SET_FILTER_ADDRESS', response)
    } catch (error) {
      console.error('Erro ao buscar todos os endereços:', error)
    }
  },

  async filter({ commit }, { category, search }) {
    try {
      const response = await API.address.filter({ category, search })
      commit('SET_FILTER_ADDRESS', response)
      commit('SET_SEARCH_CATEGORY', category)
      commit('SET_SEARCH_TERM', search)
    } catch (error) {
      console.error('Erro ao filtrar endereços:', error)
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
