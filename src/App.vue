<template>
  <header>
    <div>
      <router-link class="menu" to="/">Hello World...</router-link>
    </div>
    <div>
      <router-link class="menu" to="/board">Board</router-link>
      <router-link class="menu" to="/about">About</router-link>
    </div>
    <div>
      <template v-if="!isLogin">
        <button @click="onLogin"><span>로그인</span></button>
        <Modal
          ref="loginModal"
          @hide="onLoginHide"
        >
          <Login
            ref="login"
          />
        </Modal>
      </template>
      <template v-else>
        <button @click="onLogout"><span>로그아웃</span></button>
      </template>
    </div>
  </header>
  <div class="content" v-bind="$attrs">
    <router-view/>
  </div>
  <footer>
    <span>Bye</span>
  </footer>
</template>

<script>
import Login from '@/components/login/Login'

export default {
  name: 'App',
  components: { Login },
  data () {
    return {
      categoryId: 1,
      isLogin: false
    }
  },

  mounted () {
    // this.$refs.boardList.onSearch()
  },

  methods: {
    onMove (item) {
      this.$router.replace('/board')
    },
    onLogin () {
      this.$refs.loginModal.onShow()
    },
    onLogout () {
      this.isLogin = false
    },
    onLoginHide () {
      this.$refs.login.onClear()
    }
  }
}
</script>
