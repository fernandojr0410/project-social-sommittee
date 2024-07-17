import API from '@/services/module/API'

const state = {
  received: [],
}

const mutations = {
  SET_RECEIVED(state, received) {
    state.received = received
  },
  UPDATE_RECEIVED(state, item) {
    state.received = state.received.map((_item) => {
      return _item.id === item.id ? item : _item
    })
  },
  // UPDATE_RECEIVED(state, updatedReceived) {
  //   state.received = state.received.map((item) => {
  //     return item.id === updatedReceived.id ? updatedReceived : item
  //   })
  // },
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

  async update({ commit }, data) {
    try {
      const response = await API.received.update(data.id, data)
      commit('UPDATE_RECEIVED', response)
      console.log('Dados atualizados:', response)
      return response // se precisar de retorno para confirmar sucesso
    } catch (error) {
      console.error('Erro ao atualizar recebido:', error)
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
