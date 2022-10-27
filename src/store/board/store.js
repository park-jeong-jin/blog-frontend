import { createNamespacedHelpers } from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import types from './types'

const { mapGetters, mapActions } = createNamespacedHelpers(types.NAMESPACE)
export { mapGetters, mapActions }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
