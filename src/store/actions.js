import types from './types'

const actions = {
  [types.SET_USER]: ({ commit, state }, user) => {
    commit(types.MU_SET_USER, user)
  }
}

export default actions
