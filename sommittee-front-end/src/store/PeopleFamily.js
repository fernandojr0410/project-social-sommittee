import API from '@/services/module/API'

const state = {
  peopleFamily: [],
}

const mutations = {
  CREATE_PEOPLE_FAMILY(state, newPeopleFamily) {
    if (newPeopleFamily && !Array.isArray(newPeopleFamily))
      state.peopleFamily.push(newPeopleFamily)
  },
}

const getters = {
  getById: (state) => {
    return (id) =>
      state.peopleFamily.find((peopleFamily) => peopleFamily.id === id)
  },
}

const actions = {
  async create({ commit }, payload) {
    const response = await API.peopleFamily.create(payload)
    commit('CREATE_PEOPLE_FAMILY', response)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
