import { createStore } from 'vuex'

import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'

import board from '@/store/board/store'

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    board
  },
  plugins: []
})

export default store
