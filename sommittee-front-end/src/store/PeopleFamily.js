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
    console.log('response store', response)
    commit('SET_PEOPLE_FAMILY', response)
    return response
  },

  async create({ commit }, payload) {
    try {
      console.log('payload antes', payload)
      console.log('Criando pessoas da família com dados:', payload)
      const response = await API.peopleFamily.create(payload)
      console.log(
        'Resposta da API para criação de pessoas da família:',
        response
      )
      console.log('payload depois', payload)
      commit('CREATE_PEOPLE_FAMILY', response)
      return response
    } catch (error) {
      console.error('Erro ao criar pessoas da família:', error)
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
