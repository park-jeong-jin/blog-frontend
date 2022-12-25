<template>
  <div ref="modal" class="modal" @click="onHide">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    propsDirection: { type: String, default: 'Random' }
  },
  data () {
    return {}
  },
  mounted () {
    this.onHide()
  },
  methods: {
    onShow () {
      this.$refs.modal.style.top = '0'
      this.$refs.modal.style.left = '0'
      if (typeof this.$attrs.onShow === 'function') this.$emit('show')
    },
    onHide (event) {
      if (event && !this.$refs.modal.isEqualNode(event.target)) return false
      const random = Math.floor(Math.random() * 4)
      switch (this.propsDirection) {
        case 'Top':
          this.$refs.modal.style.top = '100%'
          break
        case 'Bottom':
          this.$refs.modal.style.top = '-100%'
          break
        case 'Left':
          this.$refs.modal.style.left = '100%'
          break
        case 'Right':
          this.$refs.modal.style.left = '-100%'
          break
        case 'Random':
          this.$refs.modal.style.top = random === 0 ? '100%' : random === 1 ? '-100%' : `${Math.floor(Math.random() * 201) - 100}%`
          this.$refs.modal.style.left = random === 2 ? '100%' : random === 3 ? '-100%' : `${Math.floor(Math.random() * 201) - 100}%`
          break
        default:
          return console.error('지정되지 않은 방향입니다.')
      }
      if (typeof this.$attrs.onHide === 'function') this.$emit('hide')
    }
  }
}
</script>

<style scoped>
div.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  top: 100%;
  transition: all 300ms cubic-bezier(0.300, 0.090, 0.000, 0.900);
  justify-content: center;
  align-items: center;
}
</style>
