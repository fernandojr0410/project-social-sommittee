import API from '@/services/module/API'

const state = {
  people: [],
}

const mutations = {
  SET_PEOPLE(state, people) {
    state.people = people
  },

  UPDATE_PEOPLE(state, updatedPeople) {
    state.people = state.people.map((item) => {
      return item.id === updatedPeople.id ? { ...item, ...updatedPeople } : item
    })
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.people.find((people) => people.id === id)
  },
}

const actions = {
  async findAll({ commit }) {
    const response = await API.people.findAll()
    commit('SET_PEOPLE', response)
  },

  async findById({ commit }, id) {
    const response = await API.people.findById(id)
    commit('UPDATE_PEOPLE', response)
  },

  async update({ commit }, { id, payload }) {
    const response = await API.people.update(id, payload)
    console.log('dados store', response)
    commit('UPDATE_PEOPLE', response)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
