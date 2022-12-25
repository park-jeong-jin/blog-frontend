import types from './types'

const getters = {
  [types.USER_NAME] (state, getters) {
    return state[types.USER][types.USER_NAME]
  },
  [types.USER_ROLE] (state, getters) {
    return state[types.USER][types.USER_ROLE]
  },
  [types.USER_LOGIN_TIME] (state, getters) {
    return state[types.USER][types.USER_LOGIN_TIME]
  },
  [types.USER_REMAIN_TIME] (state, getters) {
    return state[types.USER][types.USER_REMAIN_TIME]
  },
  [types.USER_TOKEN_TIME] (state, getters) {
    return state[types.USER][types.USER_TOKEN_TIME]
  },
  [types.USER_TIMER_ID] (state, getters) {
    return state[types.USER][types.USER_TIMER_ID]
  },
  [types.MENU_ITEMS] (state, getters) {
    return state[types.MENU_ITEMS]
  },
  [types.DEVICE] (state, getters) {
    return state[types.DEVICE]
  },
  [types.LOADING] (state, getters) {
    return state[types.LOADING]
  }
}

export default getters
