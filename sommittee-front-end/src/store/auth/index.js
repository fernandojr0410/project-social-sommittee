import API from '@/services/module/API'

const state = {
  user: null,
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.users.find((user) => user.id === id)
  },
}

const actions = {
  async fetchUser({ commit }) {
    const user = await API.auth.profile()
    commit('SET_USER', user)
  },

  async updateProfile({ commit }, payload) {
    const user = await API.auth.updateProfile(payload)
    console.log('user', user)
    commit('SET_USER', user)
  },

  async logout({ commit }) {
    await API.auth.logout()
    commit('SET_USER', null)
    localStorage.removeItem('@sommittee.access_token')
    location.reload()
  },

  async login({ commit }, requestBody) {
    await API.auth.login(requestBody)
    const user = await API.auth.profile()
    commit('SET_USER', user)
  },

  async updatePassword({ commit }, payload) {
    console.log('payload', payload)
    const response = await API.auth.updatePassword(payload)
    commit('SET_USER', response)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
