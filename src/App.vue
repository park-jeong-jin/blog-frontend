<template>
  <header>
    <div v-if="$constant.device.isMobile($_common_device)">
      <img style="padding: 4px;" :src="isMenuOpen ? img.menuFold : img.menuUnfold" @click="isMenuOpen = !isMenuOpen">
    </div>
    <div>
      <router-link class="router-link home" to="/">Jin Note</router-link>
    </div>
    <div>
      <template v-if="!$_login_username">
        <button @click="onLogin"><span>로그인</span></button>
        <Modal ref="loginModal" @show="onLoginShow" @hide="onLoginHide">
          <Login ref="login" @login="onLoginSuccess"/>
        </Modal>
      </template>
      <template v-else>
        <img :src="img.timer">
        <span>{{ strRemainTime }}</span>
        <button>연장</button>
        <button @click="onLogout"><span>로그아웃</span></button>
      </template>
    </div>
  </header>
  <MenuArea :class="[isMenuOpen ? 'on' : 'off', {'slide': $constant.device.isMobile($_common_device)}]"/>
  <div class="content" v-bind="$attrs">
    <router-view/>
  </div>
  <div v-if="false" style="position: fixed; width: 200px; height: 400px; right: 100px; top: 200px; background-color: gray;">
    <Chat/>
  </div>
  <Spinner v-show="$_common_loading"/>
  <footer>
    <span>Footer</span>
  </footer>
</template>

<script>
import commonMixin from '@/mixin/commonMixin'
import utilMixin from '@/mixin/utilMixin'
import loginMixin from '@/mixin/loginMixin'

import Login from '@/components/login/Login'
import MenuArea from '@/components/menu/MenuArea'
import Chat from '@/components/chat/Chat'

export default {
  name: 'App',
  components: { Chat, Login, MenuArea },
  mixins: [commonMixin, utilMixin, loginMixin],
  data () {
    return {
      img: {
        menuFold: require('@/assets/menu-fold-fill.svg'),
        menuUnfold: require('@/assets/menu-unfold-fill.svg'),
        timer: require('@/assets/timer-line.svg')
      },
      isMenuOpen: false
    }
  },
  computed: {
    strRemainTime () {
      let min = Math.floor(this.$_login_remainTime / 1000 / 60)
      let sec = Math.floor(this.$_login_remainTime / 1000 % 60)
      return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
    }
  },
  created () {
    this.$_login_token()
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.$_util_throttle(this.resize))
  },
  methods: {
    onLogin () {
      this.$refs.loginModal.onShow()
    },
    onLogout () {
      this.$_login_logout()
    },
    onLoginShow () {
      setTimeout(() => {
        this.$refs.login.$refs.inputUsername.focus()
      }, 1)
    },
    onLoginHide () {
      this.$refs.login.onClear()
    },
    onLoginSuccess () {
      this.$refs.login.onClear()
      this.$refs.loginModal.onHide()
    },
    resize () {
      this.$_common_setDevice(this.$constant.device.getDevice())
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/reset.css';
@import '@/assets/main.scss';
@import '@/assets/common.scss';
</style>
