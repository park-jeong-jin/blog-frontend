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
  [types.CATEGORY_ITEM] (state, getters) {
    return state[types.CATEGORY_ITEM]
  },
  [types.CATEGORY_ITEMS] (state, getters) {
    return state[types.CATEGORY_ITEMS]
  }
}

export default getters
