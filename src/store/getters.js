import types from './types'

const getters = {
  [types.USER] (state, getters) {
    return state[types.USER]
  }
}

export default getters
