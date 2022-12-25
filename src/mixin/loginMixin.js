import { mapActions, mapGetters } from '@/store/store'
import types from '@/store/types'

import api from '@/server/userApi'

export default {
  computed: {
    ...mapGetters({
      $_login_username: types.USER_NAME,
      $_login_remainTime: types.USER_REMAIN_TIME
    })
  },
  methods: {
    ...mapActions({
      $_login_clearUser: types.CLEAR_USER,
      $_login_setUser: types.SET_USER
    }),
    $_login_logout () {
      this.$_login_clearUser()
    },
    async $_login_login (param) {
      let result = await api.login(param)
        .then((res) => {
          this.$_login_setUser(res.data)
          return res
        })
        .catch((err) => {
          return err.response
        })
      console.log(result)
      return { status: 200 } // result
    },
    async $_login_token () {
      let token = sessionStorage.getItem('token')
      if (!token) return
      sessionStorage.removeItem('token')
      let result = await api.token(token)
        .then((res) => {
          this.$_login_setUser(res.data)
          return res
        })
        .catch((err) => {
          return err.response
        })
      return result
    }
  }
}
