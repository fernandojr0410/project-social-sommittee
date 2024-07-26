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
  async create({ commit }, payload) {
    const response = await API.people.create(payload)
    console.log('Resposta ao criar pessoa', response)
    commit('CREATE_PEOPLE', response)
  },

  async findAll({ commit }) {
    const response = await API.people.findAll()
    commit('SET_PEOPLE', response)
  },

  async findById({ commit }, id) {
    const response = await API.people.findById(id)
    console.log('Dados retornados por findById:', response)
    commit('UPDATE_PEOPLE', response)
    return response
  },

  async update({ commit }, { id, payload }) {
    const response = await API.people.update(id, payload)
    console.log('dados store', response)
    commit('UPDATE_PEOPLE', response)
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
