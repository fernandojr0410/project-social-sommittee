import API from '@/services/module/API'

const state = {
  family: [],
}

const mutations = {

  SET_FAMILY(state, family) {
    state.family = family
  },

  CREATE_FAMILY(state, newFamily) {
    state.family.push(newFamily)
  },

  UPDATE_FAMILY(state, updatedFamily) {
    state.family = state.family.map((item) => {
      return item.id === updatedFamily.id ? { ...item, ...updatedFamily } : item
    })
  },

  DELETE_FAMILY(state, id) {
    state.family = state.family.filter((family) => family.id !== id)
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
    commit('SET_FAMILY', response)
    return response
  },

  async create({ commit }, payload) {
    const response = await API.family.create(payload)
    commit('CREATE_FAMILY', response)
    return response
  },

  async findById({ commit }, id) {
    const response = await API.family.findById(id)
    console.log("findById store", response)
    commit('UPDATE_FAMILY', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.family.update(id, payload)
    commit('UPDATE_FAMILY', response)
    return response
  },

  async delete({ commit }, id) {
    const response = await API.family.delete(id)
    commit('DELETE_FAMILY', id)
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
