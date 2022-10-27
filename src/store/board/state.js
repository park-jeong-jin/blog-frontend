import types from './types'

const state = {
  [types.PARAM]: {
    page: 0,
    size: 5
    // pageable: {
    //   page: 0,
    //   size: 5,
    //   totalPages: 0,
    //   totalElements: 0,
    //   first: true,
    //   last: true
    // }
  },
  [types.ITEM]: {},
  [types.ITEMS]: {},
  [types.OPTIONS]: {
    editMode: null
  },
  [types.CATEGORY_ITEM]: {},
  [types.CATEGORY_ITEMS]: []
}

export default state
