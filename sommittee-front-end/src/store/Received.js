import API from '@/services/module/API'

const state = {
  received: [],
}

const mutations = {
  SET_RECEIVED(state, received) {
    state.received = received
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
  async findAll({ commit }) {
    const response = await API.received.findAll()
    commit('SET_RECEIVED', response)
  },

  async findById({ commit }, id) {
    const response = await API.received.findById(id)
    commit('UPDATE_RECEIVED', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.received.update(id, payload)
    commit('UPDATE_RECEIVED', response)
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
