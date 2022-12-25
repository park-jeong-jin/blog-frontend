<template>
  <div class="home">
    <board-preview
      v-for="(item, index) in items"
      :key="index"
      :props-data="item"
    />
  </div>
</template>

<script>
import commonMixin from '@/mixin/commonMixin'
import utilMixin from '@/mixin/utilMixin'

import boardPreview from '@/components/home/BoardPreview'

import boardApi from '@/server/boardApi'

export default {
  name: 'Home',
  components: {
    boardPreview
  },
  mixins: [commonMixin, utilMixin],
  data () {
    return {
      items: [],
      pageable: {
        page: 0,
        size: 10,
        last: false
      },
      isSearching: false,
      throttleScroll: null
    }
  },
  computed: {},
  created () {
    this.onSearch()
  },
  mounted () {
    this.throttleScroll = this.$_util_throttle(this.onScroll)
    this.$el.addEventListener('scroll', this.throttleScroll)
  },
  unmounted () {
    this.$el.removeEventListener('scroll', this.throttleScroll)
  },
  methods: {
    async onSearch () {
      this.isSearching = true
      try {
        let param = { ...this.pageable }
        let result = await boardApi.queryPaging(param)
        this.items.push(...result.data.content)
        this.pageable.page = result.data.number
        this.pageable.last = result.data.last
        setTimeout(() => {
          this.onScroll()
          this.isSearching = false
        }, 100)
      } catch (e) {
        console.error(e)
      }
    },
    onScroll () {
      if (this.pageable.last) return false
      const { scrollHeight, scrollTop, clientHeight } = this.$el
      if (scrollHeight < scrollTop + clientHeight + 60) {
        this.pageable.page++
        this.onSearch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
