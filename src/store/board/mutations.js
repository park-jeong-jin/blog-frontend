import types from './types'

const mutations = {
  [types.MU_SET_ITEM] (state, payload) {
    state[types.ITEM] = payload
  },
  [types.MU_SET_ITEMS] (state, payload) {
    state[types.ITEMS] = payload
  },
  [types.MU_SET_OPTIONS] (state, payload) {
    state[types.OPTIONS] = payload
  },
  [types.MU_SET_CATEGORY_ITEM] (state, payload) {
    state[types.CATEGORY_ITEM] = payload
  },
  [types.MU_SET_CATEGORY_ITEMS] (state, payload) {
    state[types.CATEGORY_ITEMS] = payload
  }
}

export default mutations
