import Utils from '@/plugins/utils'

export default {
  methods: {
    $_util_debounce (func, delay = 300) {
      return Utils.debounce(func, delay)
    },
    $_util_throttle (func, delay = 300) {
      return Utils.throttle(func, delay)
    },
    $_util_cloneDeep (value) {
      return Utils.cloneDeep(value)
    },
    $_util_getContentHeight () {
      return document.querySelector('div.content').clientHeight
    }
  }
}
