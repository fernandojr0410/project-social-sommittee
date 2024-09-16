import API from '@/services/module/API'

const state = {
  user: null,
  // user: [],
}

const mutations = {
  SET_USER(state, payload) {
    state.user = { ...state.user, ...payload }
  },
}

const getters = {
  getById: (state) => {
    return (id) => state.users.find((user) => user.id === id)
  },

  avatarUrl: (state) => {
    return state.user?.avatarUrl || ''
  },
}

const actions = {
  async login({ commit }, requestBody) {
    await API.auth.login(requestBody)
    const user = await API.auth.profile()
    commit('SET_USER', user)
  },

  async fetchUsers({ commit }) {
    try {
      const response = await API.user.getAll()
      commit('SET_USERS', response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      throw error
    }
  },

  async fetchUser({ commit }) {
    const user = await API.auth.profile()
    commit('SET_USER', user)
  },

  async logout({ commit }) {
    await API.auth.logout()
    commit('SET_USER', null)
    localStorage.removeItem('@sommittee.access_token')
    location.reload()
  },

  async updateProfile({ commit }, payload) {
    const user = await API.auth.updateProfile(payload)
    commit('SET_USER', user)
  },

  async updatePassword({ commit }, payload) {
    const response = await API.auth.updatePassword(payload)
    commit('SET_USER', response)
  },

  // async uploadAvatar({ commit, state }, formData) {
  //   try {
  //     const response = await API.auth.uploadAvatar(formData)
  //     console.log('Resposta da API:', response)

  //     if (response && response.avatar) {
  //       const avatarUrl = response.avatar
  //       const updatedUser = { ...state.user, avatar: avatarUrl }
  //       commit('SET_USER', updatedUser)
  //       return response
  //     } else {
  //       throw new Error('avatar não encontrado na resposta')
  //     }
  //   } catch (error) {
  //     console.error('Erro ao enviar o avatar:', error)
  //     throw error
  //   }
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
