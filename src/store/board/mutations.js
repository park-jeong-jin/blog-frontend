import types from './types'

const mutations = {
  [types.MU_SET_PARAM] (state, payload) {
    state[types.PARAM] = payload
  },
  [types.MU_SET_ITEM] (state, payload) {
    state[types.ITEM] = payload
  },
  [types.MU_SET_ITEMS] (state, payload) {
    state[types.ITEMS] = payload
  },
  [types.MU_SET_OPTIONS] (state, payload) {
    state[types.OPTIONS] = payload
  },
  [types.MU_SET_PAGINANTION] (state, payload) {
    state[types.PAGINATION] = payload
  }
}

export default mutations
