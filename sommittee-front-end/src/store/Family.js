import API from '@/services/module/API'

const state = {
  family: [],
}

const mutations = {
  CREATE_FAMILY(state, newFamily) {
    state.family.push(newFamily)
  },

  SET_FAMILY(state, family) {
    state.family = family
  },

  UPDATE_FAMILY(state, updatedFamily) {
    state.family = state.family.map((item) => {
      return item.id === updatedFamily.id ? { ...item, ...updatedFamily } : item
    })
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.family.find((family) => family.id === id)
  },
}

const actions = {
  async findAll({ commit }, query) {
    const response = await API.family.findAll(query)
    console.log('findAll store family', response)
    commit('SET_FAMILY', response)
    return response
  },

  async create({ commit }, payload) {
    try {
      const response = await API.family.create(payload)
      console.log('response store family', response)
      if (response) {
        commit('CREATE_FAMILY', response)
      } else {
        console.error('Resposta inválida da API:', response)
      }
      return response
    } catch (error) {
      console.error('Erro ao criar família:', error)
      throw error
    }
  },

  async findById({ commit }, id) {
    const response = await API.family.findById(id)
    commit('UPDATE_FAMILY', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.family.update(id, payload)
    commit('UPDATE_FAMILY', response)
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
