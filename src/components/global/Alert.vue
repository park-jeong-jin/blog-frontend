<template>
  <div v-show="show" class="bgArea">
    <div class="alert">
      <div class="contentArea">
        <p v-for="(text, index) in message" :key="index">{{ text }}</p>
      </div>
      <div class="buttonArea">
        <button v-if="options.buttons.includes($constant.confirm.no)" @click="onHide($constant.confirm.no)">아니요</button>
        <button v-if="options.buttons.includes($constant.confirm.yes)" @click="onHide($constant.confirm.yes)">예</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Alert',
  setup () {
    const resolvePromise = ref(null)
    const show = ref(false)
    const message = ref(null)
    const options = ref({ buttons: [] })

    const onShow = (text, opt) => {
      message.value = Array.isArray(text) ? text : [text]
      options.value = opt
      show.value = true
      return new Promise((resolve, reject) => {
        resolvePromise.value = resolve
      })
    }

    const onHide = (value) => {
      resolvePromise.value(value)
      show.value = false
    }

    return { show, message, options, onShow, onHide }
  }
}
</script>

<style lang="scss" scoped>
div.bgArea {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);

  > .alert {
    width: 300px;
    position: fixed;
    left: calc(50% - 150px);
    top: calc(50% - 100px);
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: .3rem;

    > .contentArea {
      padding: 5px;
    }

    > .buttonArea {
      text-align: center;

      > button {
        width: 55px;
      }
    }
  }
}
</style>
