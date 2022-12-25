import { mapActions, mapGetters } from '@/store/store'
import types from '@/store/types'

export default {
  computed: {
    ...mapGetters({
      $_common_userRole: types.USER_ROLE,
      $_common_device: types.DEVICE,
      $_common_loading: types.LOADING
    })
  },
  methods: {
    ...mapActions({
      $_common_setDevice: types.SET_DEVICE,
      $_common_setLoading: types.SET_LOADING
    })
  }
}
