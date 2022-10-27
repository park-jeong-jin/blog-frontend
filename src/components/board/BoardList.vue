<template>
  <table class="list">
    <colgroup>
      <col width="80%">
      <col width="*">
    </colgroup>
    <thead>
      <tr>
        <th colspan="2" style="text-align: left;">
          게시판의 글 목록...
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <th style="text-align: left;">
          <a href="javascript:void(0)" @click="onView(item)">{{ item.title }}</a>
          <span>({{ item.hits }})</span>
        </th>
        <td style="text-align: center">
          {{ item.writer || 'Admin' }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          <pagination :props-data="pageable" @move="onMove"/>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import pagination from '../Pagination'

import api from '../../server/boardApi'

export default {
  name: 'BoardList',
  components: { pagination },
  props: {
    propsCategory: {
      type: Number,
      default () {
        return 0
      }
    }
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
  mounted () {
    this.onSearch()
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  methods: {
    onSearch () {
      let param = { ...this.pageable, id: null, categoryId: this.propsCategory }
      api.queryPaging(param).then((result) => {
        this.copyToPageable(result.data, this.pageable)
        this.items = result.data.content
      })
    },
    onView (item) {
      this.$emit('view', item.id)
    },
    onMove (param) {
      this.pageable.page = param.page
      this.onSearch()
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
    }
  }
}
</script>
