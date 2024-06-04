import axios from 'axios'
import AuthService from '../../services/AuthService'

const state = () => {
  return {
    user: null
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

const actions = {
  async login ({ dispatch }, payload) {
    const data = await AuthService.store('', payload)

    if (data.token) {
      localStorage.setItem('jwt_token', data.token)
      axios.defaults.headers.Authorization = `Bearer ${data.token}`
      return dispatch('me')
    }

    return data
  },
  async me ({ commit }) {
    const data = await AuthService.show('/me')
    commit('SET_USER', data)
    return data
  },
  async changePassword ({ commit }, payload) {
    await AuthService.update('/password', payload)
    localStorage.removeItem('jwt_token')
    axios.defaults.headers.Authorization = null
    commit('SET_USER', null)
  },
  async changePhoto ({ commit }, payload) {
    const data = await AuthService.update('/photo', payload)
    commit('SET_USER', data)
    return data
  },
  async logout ({ commit }) {
    AuthService.show('/logout')
    localStorage.removeItem('jwt_token')
    axios.defaults.headers.Authorization = null
    commit('SET_USER', null)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}