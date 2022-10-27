<template>
  <div class="category">
    <CategoryItem
      v-for="(item, index) in categoryItems"
      :key="index"
      :props-data="item"
      @click="onClickCategory"
    />
  </div>
  <div class="board">
    <board-preview
      ref="boardPreview"
    />
    <board-detail
      ref="boardDetail"
    />
    <board-list
      ref="boardList"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from '@/store/board/store'
import types from '@/store/board/types'

import CategoryItem from '@/components/CategoryItem'
import BoardPreview from '@/components/board/BoardPreview'
import BoardDetail from '@/components/board/BoardDetail'
import BoardList from '@/components/board/BoardList'

export default {
  name: 'Board',
  components: {
    CategoryItem,
    BoardPreview,
    BoardDetail,
    BoardList
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      categoryItem: types.CATEGORY_ITEM,
      categoryItems: types.CATEGORY_ITEMS
    })
  },
  mounted () {
    this.queryCategoryItems()
  },
  methods: {
    ...mapActions({
      clearItems: types.CLEAR_ITEMS,
      setParam: types.SET_PARAM,
      setCategoryItem: types.SET_CATEGORY_ITEM,
      queryItems: types.QUERY_ITEMS,
      queryCategoryItems: types.QUERY_CATEGORY_ITEMS
    }),
    onClickCategory (item) {
      this.setCategoryItem(item)
      this.clearItems()
      this.queryItems()
    }
  }
}
</script>
