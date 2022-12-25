import types from './types'

const getters = {
  [types.PARAM] (state, getters) {
    return state[types.PARAM]
  },
  [types.ITEM] (state, getters) {
    return state[types.ITEM]
  },
  [types.ITEMS] (state, getters) {
    return state[types.ITEMS]
  },
  [types.OPTIONS] (state, getters) {
    return state[types.OPTIONS]
  },
  [types.PAGINATION] (state, getters) {
    return state[types.PAGINATION]
  }
}

export default getters
