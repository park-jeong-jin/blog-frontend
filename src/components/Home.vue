<template>
  <div>
    <h1>Home</h1>
    <board-preview
      v-for="(item, index) in items"
      :key="index"
      :props-data="item"
    />
    <pagination
      :props-data="pageable"
      @move="onMovePage"
    />
  </div>
</template>

<script>
import boardPreview from '@/components/board/BoardPreview'
import pagination from '@/components/Pagination'

import boardApi from '@/server/boardApi'

export default {
  name: 'Home',
  components: {
    boardPreview,
    pagination
  },
  data () {
    return {
      items: [],
      pageable: {
        page: 0,
        size: 5,
        totalPages: 0,
        totalElements: 0,
        first: true,
        last: true
      }
    }
  },
  computed: {},
  created () {
    this.onSearch()
  },
  methods: {
    onSearch () {
      let param = { ...this.pageable }
      boardApi.queryPaging(param).then((result) => {
        this.items = result.data.content
        this.copyToPageable(result.data, this.pageable)
      })
    },
    copyToPageable (from, to) {
      const copyKeys = ['page', 'size', 'totalPages', 'totalElements', 'first', 'last']
      for (const key of copyKeys) {
        to[key] = from[key]
      }
      const copyReplaceKeys = [{ origin: 'page', replace: 'number' }]
      for (const key of copyReplaceKeys) {
        to[key.origin] = from[key.origin] || from[key.replace]
      }
    },
    onMovePage (param) {
      this.pageable.page = param.page
      this.onSearch()
    }
  }
}
</script>
