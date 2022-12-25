<template>
  <div class="login">
    <input ref="inputUsername" v-model="user.username" type="text" title="아이디 입력" placeholder="아이디" @keydown.enter="$refs.inputPassword.focus()" @keydown.tab="$event.stopPropagation()">
    <span v-if="error.username">{{ error.username }}</span>
    <input ref="inputPassword" v-model="user.password" type="password" title="비밀번호 입력" placeholder="비밀번호" @keydown.enter="onLogin">
    <span v-if="error.password">{{ error.password }}</span>
    <button @click="onLogin"><span>로그인</span></button>
  </div>
</template>

<script>
import loginMixin from '@/mixin/loginMixin'

export default {
  name: 'Login',
  mixins: [loginMixin],
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      error: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    onClear () {
      this.user.username = null
      this.user.password = null
    },
    onLogin () {
      this.error.username = null
      this.error.password = null
      if (!this.user.username) {
        this.error.username = '아이디를 입력해주세요.'
        return false
      }
      if (!this.user.password) {
        this.error.password = '패스워드를 입력해주세요.'
        return false
      }
      this.$_login_login(this.user)
        .then((res) => {
          if (res.status === 200) {
            if (typeof this.$attrs.onLogin === 'function') this.$emit('login')
          } else {
            alert('로그인에 실패하였습니다.')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
div.login {
  width: min-content;
  padding: 5px;
  border: 1px solid $border-color1;
  border-radius: 5px;
  background-color: $sub_color2;
}

div.login > input {
  width: available;
}

div.login > span {
  width: available;
  font-size: smaller;
  color: red;
}

div.login button {
  width: 100%;
  margin-top: 5px;
}
</style>
