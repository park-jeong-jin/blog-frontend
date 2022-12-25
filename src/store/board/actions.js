import types from './types'

import utils from '@/plugins/utils'

import boardApi from '@/server/boardApi'

const actions = {
  [types.SET_PARAM]: ({ commit }, payload) => {
    commit(types.MU_SET_PARAM, utils.cloneDeep(payload))
  },
  [types.SET_ITEM]: ({ commit }, payload) => {
    commit(types.MU_SET_ITEM, utils.cloneDeep(payload))
  },
  [types.SET_ITEMS]: ({ commit }, payload) => {
    commit(types.MU_SET_ITEMS, utils.cloneDeep(payload))
  },
  [types.SET_OPTIONS]: ({ commit }, payload) => {
    commit(types.MU_SET_OPTIONS, utils.cloneDeep(payload))
  },
  [types.SET_PAGINANTION]: ({ commit }, payload) => {
    commit(types.MU_SET_PAGINANTION, utils.cloneDeep(utils.convertPagination(payload)))
  },
  [types.CLEAR_ITEM]: ({ commit }, payload) => {
    commit(types.MU_SET_ITEM, {})
  },
  [types.CLEAR_ITEMS]: ({ commit }, payload) => {
    commit(types.MU_SET_ITEMS, [])
  },
  [types.QUERY_ITEM]: async ({ commit, getters }, payload) => {
    let result = await boardApi.queryId(payload || getters[types.PARAM])
    commit(types.MU_SET_ITEM, result.data)
    return getters[types.ITEM]
  },
  [types.QUERY_ITEMS]: async ({ commit, getters }, payload) => {
    let result = await boardApi.queryPaging(payload || getters[types.PARAM])
    commit(types.MU_SET_ITEMS, result.data.content)
    commit(types.MU_SET_PAGINANTION, utils.cloneDeep(utils.convertPagination(result.data)))
    return getters[types.ITEMS]
  },
  [types.SAVE_ITEM]: async ({ commit }, payload) => {
    let result = !payload.id ? await boardApi.create(payload) : await boardApi.update(payload)
    return result
  },
  [types.DELETE_ITEM]: async ({ commit }, payload) => {
    let result = await boardApi.delete(payload)
    return result
  }
}

export default actions
