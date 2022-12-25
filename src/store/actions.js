import types from './types'
import axios from 'axios'
import menuApi from '@/server/menuApi'

const actions = {
  [types.SET_USER]: ({ commit, dispatch, getters }, payload) => {
    commit(types.MU_SET_USER, payload)
    axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`
    sessionStorage.setItem('token', payload.token)
    dispatch(types.SET_USER_LOGIN_TIME, new Date())
    dispatch(types.SET_USER_REMAIN_TIME, getters[types.USER_TOKEN_TIME])
    if (getters[types.USER_TIMER_ID]) clearInterval(getters[types.USER_TIMER_ID])
    let timerId = setInterval(() => {
      let remainTime = getters[types.USER_TOKEN_TIME] - (new Date() - getters[types.USER_LOGIN_TIME])
      dispatch(types.SET_USER_REMAIN_TIME, remainTime)
      if (remainTime <= 0) {
        clearInterval(getters[types.USER_TIMER_ID])
        dispatch(types.CLEAR_USER)
      }
    }, 1000)
    dispatch(types.SET_USER_TIMER_ID, timerId)
  },
  [types.CLEAR_USER]: ({ commit, state }, payload) => {
    commit(types.MU_SET_USER, {})
    axios.defaults.headers.common.Authorization = null
    sessionStorage.removeItem('token')
    if (state[types.USER_TIMER_ID]) {
      clearInterval(state[types.USER_TIMER_ID])
      state[types.USER_TIMER_ID] = null
    }
  },
  [types.SET_USER_LOGIN_TIME]: ({ state }, payload) => {
    state[types.USER][types.USER_LOGIN_TIME] = payload
  },
  [types.SET_USER_REMAIN_TIME]: ({ state }, payload) => {
    state[types.USER][types.USER_REMAIN_TIME] = payload
  },
  [types.SET_USER_TIMER_ID]: ({ state }, payload) => {
    state[types.USER][types.USER_TIMER_ID] = payload
  },
  [types.QUERY_MENU_ITEMS]: async ({ commit, state }, payload) => {
    let result = await menuApi.queryDw()
    commit(types.MU_SET_MENU_ITEMS, result.data)
  },
  [types.SET_DEVICE]: ({ commit, state }, payload) => {
    commit(types.MU_SET_DEVICE, payload)
  },
  [types.SET_LOADING]: ({ commit, state }, payload) => {
    setTimeout(() => {
      commit(types.MU_SET_LOADING, payload)
    }, payload >= 0 ? 0 : 300)
  }
}

export default actions
