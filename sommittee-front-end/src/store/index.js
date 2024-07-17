import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/User'
import received from './Received'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    received,
  },
})
