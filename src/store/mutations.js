import types from './types'

const mutations = {
  [types.MU_SET_USER] (state, payload) {
    state[types.USER][types.USER_NAME] = payload.name
    state[types.USER][types.USER_ROLE] = payload.role
    state[types.USER][types.USER_TOKEN] = payload.token
  },
  [types.MU_SET_MENU_ITEMS] (state, payload) {
    state[types.MENU_ITEMS] = payload
  },
  [types.MU_SET_DEVICE] (state, payload) {
    state[types.DEVICE] = payload
  },
  [types.MU_SET_LOADING] (state, payload) {
    state[types.LOADING] += payload
  }
}

export default mutations
