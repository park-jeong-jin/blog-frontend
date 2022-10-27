import types from './types'

import boardApi from '@/server/boardApi'
import categoryApi from '@/server/categoryApi'

const actions = {
  [types.SET_ITEM]: ({ commit, state }, payload) => {
    commit(types.MU_SET_ITEM, payload)
  },
  [types.SET_ITEMS]: ({ commit, state }, payload) => {
    commit(types.MU_SET_ITEMS, payload)
  },
  [types.SET_OPTIONS]: ({ commit, state }, payload) => {
    commit(types.MU_SET_OPTIONS, payload)
  },
  [types.SET_CATEGORY_ITEM]: ({ commit, state }, payload) => {
    commit(types.MU_SET_CATEGORY_ITEM, payload)
  },
  [types.SET_CATEGORY_ITEM]: ({ commit, state }, payload) => {
    commit(types.MU_SET_CATEGORY_ITEM, payload)
  },
  [types.CLEAR_ITEMS]: ({ commit, state }, payload) => {
    commit(types.MU_SET_ITEMS, [])
  },
  [types.QUERY_ITEMS]: async ({ commit, state }, payload) => {
    let result = await boardApi.queryPaging(state.param)
    commit(types.MU_SET_ITEMS, result.data.content)
    return state[types.ITEMS]
  },
  [types.QUERY_CATEGORY_ITEMS]: async ({ commit, state }, payload) => {
    let result = await categoryApi.queryDw(payload || {})
    commit(types.MU_SET_CATEGORY_ITEMS, result.data)
    return state[types.CATEGORY_ITEMS]
  }
}

export default actions
