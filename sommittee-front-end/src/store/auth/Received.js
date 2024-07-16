import API from '@/services/module/API'

const state = {
  received: [],
  // id: null,
}

const mutations = {
  // SET_ID(state, id) {
  //   state.id = id
  // },
  SET_RECEIVED(state, receipts) {
    state.receipts = receipts
  },
}

// const getters = {
//   getSelected: (state) => {
//     return (id) => state.receipts.find((item) => item.id === id)
//   },
// }

const actions = {
  async findAll({ commit }) {
    const response = await API.received.findAll()
    console.log('response', response)
    commit('SET_RECEIVED', response)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
}
