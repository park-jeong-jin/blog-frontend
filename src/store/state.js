import types from './types'

const state = {
  [types.USER]: {
    [types.USER_NAME]: null,
    [types.USER_ROLE]: null,
    [types.USER_TOKEN]: null,
    [types.USER_LOGIN_TIME]: null,
    [types.USER_REMAIN_TIME]: null,
    [types.USER_TOKEN_TIME]: 10 * 60 * 1000,
    [types.USER_TIMER_ID]: null
  },
  [types.MENU_ITEMS]: [],
  [types.DEVICE]: 'DESKTOP',
  [types.LOADING]: 0
}

export default state
