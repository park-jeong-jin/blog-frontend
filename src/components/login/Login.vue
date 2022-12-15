<template>
  <div class="login">
    <input v-model="account.username" type="text" title="아이디 입력" placeholder="아이디">
    <input v-model="account.password" type="password" title="비밀번호 입력" placeholder="비밀번호">
    <button @click="onLogin"><span>로그인</span></button>
  </div>
</template>

<script>
import api from '@/server/accountApi'

export default {
  name: 'Login',
  data () {
    return {
      account: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    onClear () {
      this.account.username = null
      this.account.password = null
    },
    onLogin () {
      api.login(this.account).then(() => {
        console.log(arguments)
      })
    }
  }
}
</script>

<style scoped>
div.login {
  width: min-content;
  padding: 5px;
  border: #588282 1px solid;
  border-radius: 5px;
  background-color: lightskyblue;
}

div.login input {
  width: available;
}

div.login button {
  width: 100%;
  margin-top: 5px;
}
</style>
