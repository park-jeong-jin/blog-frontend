import types from './types'

const mutations = {
  [types.MU_SET_USER] (state, payload) {
    state.user = payload
  }
}

export default mutations
