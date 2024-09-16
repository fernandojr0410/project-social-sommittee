import API from '@/services/module/API'

const state = {
  peopleFamily: [],
}

const mutations = {
  CREATE_PEOPLE_FAMILY(state, newPeopleFamily) {
    state.peopleFamily.push(newPeopleFamily)
  },

  SET_PEOPLE_FAMILY(state, peopleFamily) {
    state.peopleFamily = peopleFamily
  },
}

const getters = {
  getById: (state) => {
    return (id) =>
      state.peopleFamily.find((peopleFamily) => peopleFamily.id === id)
  },
}

const actions = {
  async findAll({ commit }) {
    const response = await API.peopleFamily.findAll()
    commit('SET_PEOPLE_FAMILY', response)
    return response
  },

  async create({ commit }, payload) {
    const response = await API.peopleFamily.create(payload)
    commit('CREATE_PEOPLE_FAMILY', response)
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
