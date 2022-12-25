<template>
  <div class="w100p h100p">
    <div v-for="(item, index) in messages" :key="index">
      {{ item }}
    </div>
    <input v-model="message" @keydown.enter="onSend">
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'Chat',
  data () {
    return {
      socket: null,
      messages: [],
      message: null
    }
  },
  created () {
    this.onConnect()
  },
  unmounted () {
    this.onDisconnect()
  },
  methods: {
    onSend () {
      if (!this.message) return
      console.log('Send message:' + this.message)
      if (this.stompClient && this.stompClient.connected) {
        const req = { username: 'admin', content: this.message }
        this.stompClient.send('/receive', JSON.stringify(req), {})
      }
      this.message = null
    },
    onConnect () {
      const serverURL = 'http://localhost:3308'
      let socket = new SockJS(serverURL)
      this.stompClient = Stomp.over(socket)
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          console.log('소켓 연결 성공', frame)
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe('/send', res => {
            console.log('구독으로 받은 메시지 입니다.', res.body)

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.messages.push(JSON.parse(res.body))
          })
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error)
        }
      )
    },
    onDisconnect () {
      this.stompClient.disconnect()
    }
  }
}
</script>
