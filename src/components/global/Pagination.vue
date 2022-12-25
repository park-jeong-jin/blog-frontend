<template>
  <div class="pagination w100p">
    <button v-show="buttonCount >= 9" class="bgOnly left2" :disabled="propsData.first" @click="onSelect(0)">First</button>
    <button class="bgOnly left" :disabled="propsData.first" @click="onSelect(pages.at(0) - 1)">Previous</button>
    <button v-for="page in pages" :key="page" :class="[{'active': page === propsData.page}]" @click="onSelect(page)">{{ page + 1 }}</button>
    <button class="bgOnly right" :disabled="propsData.last" @click="onSelect(pages.at(-1) + 1)">Next</button>
    <button v-show="buttonCount >= 9" class="bgOnly right2" :disabled="propsData.last" @click="onSelect(propsData.totalPages - 1)">Last</button>
  </div>
</template>

<script>
import utilMixin from '@/mixin/utilMixin'

export default {
  name: 'Pagination',
  mixins: [utilMixin],
  props: {
    propsData: {
      type: Object,
      default () {
        return {
          size: 0,
          page: 0,
          totalPages: 0,
          totalElements: 0,
          first: true,
          last: true
        }
      }
    }
  },
  data () {
    return {
      buttonCount: 3,
      debounceResize: null
    }
  },
  computed: {
    pages () {
      let numBtnCount = this.buttonCount - 2 - (this.buttonCount >= 9 ? 2 : 0)
      let min = Math.max(0, this.propsData.page - numBtnCount)
      let max = Math.min((min || this.propsData.page) + numBtnCount, this.propsData.totalPages)
      return Array.from({ length: max - min }, (v, i) => min + i)
    }
  },
  mounted () {
    this.resize()
    this.debounceResize = this.$_util_debounce(this.resize)
    window.addEventListener('resize', this.debounceResize)
  },
  unmounted () {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    onSelect (page) {
      if (page < 0) page = 0
      else if (page > this.propsData.totalPages) page = this.propsData.totalPages
      this.$emit('select', page)
    },
    resize () {
      let width = this.$el.clientWidth
      this.buttonCount = Math.min(11, width / 28)
    }
  }
}
</script>
