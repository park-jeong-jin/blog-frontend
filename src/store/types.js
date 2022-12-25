const types = {
  // state
  USER: 'user',
  USER_NAME: 'name',
  USER_ROLE: 'role',
  USER_TOKEN: 'token',
  USER_LOGIN_TIME: 'loginTime',
  USER_REMAIN_TIME: 'remainTime',
  USER_TOKEN_TIME: 'tokenTime',
  USER_TIMER_ID: 'timerId',
  MENU_ITEMS: 'menuItems',
  DEVICE: 'device',
  LOADING: 'loading',
  // actions
  SET_USER: 'setUser',
  SET_USER_LOGIN_TIME: 'setUserLoginTime',
  SET_USER_REMAIN_TIME: 'setUserRemainTime',
  SET_USER_TIMER_ID: 'setUserTimerId',
  CLEAR_USER: 'clearUser',
  QUERY_MENU_ITEMS: 'setMenuItems',
  SET_DEVICE: 'setDevice',
  SET_LOADING: 'setLoading',
  // mutations
  MU_SET_USER: 'MU_SET_USER',
  MU_SET_MENU_ITEMS: 'MU_SET_MENU_ITEMS',
  MU_SET_DEVICE: 'MU_SET_DEVICE',
  MU_SET_LOADING: 'MU_SET_LOADING'
}

export default types
