import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/User'
import received from './Received'
import people from './People'
import family from './Family'
import peopleFamily from './PeopleFamily'
import address from './Address'
import product from './Product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    received,
    people,
    family,
    peopleFamily,
    product,
    address,
  },
  state: {
    snackbar: {
      visible: false,
      status: '',
      text: '',
    },
  },
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar
    },
  },
  actions: {
    snackbar({ commit }, { status, text }) {
      commit('SET_SNACKBAR', { status, text })
    },
  },
  getters: {
    snackbar: (state) => state.snackbar,
  },
})
