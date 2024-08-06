import API from '@/services/module/API'

const state = {
  people: [],
}

const mutations = {
  CREATE_PEOPLE(state, newPeople) {
    state.people.push(newPeople)
  },

  SET_PEOPLE(state, people) {
    state.people = people
    state.filteredPeople = people
  },

  UPDATE_PEOPLE(state, updatedPeople) {
    state.people = state.people.map((item) => {
      return item.id === updatedPeople.id ? { ...item, ...updatedPeople } : item
    })
  },

  DELETE_PEOPLE(state, id) {
    state.people = state.people.filter((person) => person.id !== id)
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.people.find((people) => people.id === id)
  },
}

const actions = {
  async create({ commit }, payload) {
    const response = await API.people.create(payload)
    commit('CREATE_PEOPLE', response)
  },

  async findAll({ commit }, query) {
    const response = await API.people.findAll(query)
    commit('SET_PEOPLE', response)
    return response
  },

  async findById({ commit }, id) {
    const response = await API.people.findById(id)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.people.update(id, payload)
    return response
  },

  async delete({ commit }, id) {
    const response = await API.people.delete(id)
    commit('DELETE_PEOPLE', id)
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
