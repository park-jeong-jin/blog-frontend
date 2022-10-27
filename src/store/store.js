import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import board from '@/store/board/store'

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: { board },
  plugins: []
})

export default store
