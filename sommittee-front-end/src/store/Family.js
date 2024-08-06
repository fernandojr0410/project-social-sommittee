import API from '@/services/module/API'

const state = {
  family: [],
}

const mutations = {
  CREATE_FAMILY(state, newFamily) {
    if (newFamily && !Array.isArray(newFamily)) {
      state.family.push(newFamily)
    }
  },

  SET_FAMILY(state, family) {
    if (Array.isArray(family)) {
      state.family = family
      state.filteredFamily = family
    }
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
  async create({ commit }, payload) {
    const response = await API.family.create(payload)
    commit('CREATE_FAMILY', response)
    return response
  },

  async findAll({ commit }, query) {
    const response = await API.family.findAll(query)
    commit('SET_FAMILY', response)
    return response
  },

  async findById({ commit }, id) {
    console.log('ID store', id)
    const response = await API.family.findById(id)
    console.log('Familia filtrado!', response)
    commit('UPDATE_FAMILY', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.family.update(id, payload)
    console.log('Data Family Update', response)
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
