import API from '@/services/module/API'

const state = {
  received: [],
}

const mutations = {
  SET_RECEIVED(state, received) {
    state.received = received
  },

  CREATE_RECEIVED(state, newReceived) {
    state.received.push(newReceived)
  },

  UPDATE_RECEIVED(state, updatedReceived) {
    state.received = state.received.map((item) => {
      return item.id === updatedReceived.id
        ? { ...item, ...updatedReceived }
        : item
    })
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.received.find((received) => received.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.received.findAll(query)
    commit('SET_RECEIVED', response)
    return response
  },

  async create({ commit }, payload) {
    const response = await API.received.create(payload)
    console.log('create store', response)
    commit('CREATE_RECEIVED', response)
    return response
  },

  async findById({ commit }, id) {
    try {
      const response = await API.received.findById(id)
      console.log('findById store', response)
      commit('UPDATE_RECEIVED', response)
      return response
    } catch (error) {
      console.error('erro ao filtrar ID store', error)
      throw error
    }
  },

  async update({ commit }, { id, payload }) {
    try {
      const response = await API.received.update(id, payload)
      console.log('update store', response)
      commit('UPDATE_RECEIVED', response)
      return response
    } catch (error) {
      console.error('erro ao atualizar store', error)
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
