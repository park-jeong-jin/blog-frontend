import constants from '@/plugins/constant'
import types from './types'

const state = {
  [types.PARAM]: {
    menuId: null,
    page: 0,
    size: 5
  },
  [types.ITEM]: {},
  [types.ITEMS]: [],
  [types.OPTIONS]: {
    editMode: constants.editMode.empty
  },
  [types.PAGINATION]: {
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true
  }
}

export default state
