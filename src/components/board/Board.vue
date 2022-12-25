<template>
  <div v-bind:="$attrs" class="board" style="min-height: 100%;">
    <board-detail ref="boardDetail" @saved="onSearch" @deleted="onSearchItems"/>
    <board-list
      ref="boardList"
      :props-data="items"
      :props-pagination="pagination"
      @select-item="onSearch"
      @select-page="onSelectPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from '@/store/board/store'
import types from '@/store/board/types'

import commonMixin from '@/mixin/commonMixin'
import utilMixin from '@/mixin/utilMixin'

import BoardDetail from '@/components/board/BoardDetail'
import BoardList from '@/components/board/BoardList'

export default {
  name: 'Board',
  components: {
    BoardDetail,
    BoardList
  },
  mixins: [commonMixin, utilMixin],
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      param: types.PARAM,
      item: types.ITEM,
      items: types.ITEMS,
      pagination: types.PAGINATION
    })
  },
  watch: {
    '$route.params.menuId' (newValue, oldValue) {
      this.setParam({ ...this.param, menuId: newValue })
      this.onSearchItems()
    }
  },
  created () {
    this.setParam({ ...this.param, menuId: this.$route.params.menuId })
    this.onSearchItems()
  },
  methods: {
    ...mapActions({
      clearItem: types.CLEAR_ITEM,
      clearItems: types.CLEAR_ITEMS,
      setParam: types.SET_PARAM,
      queryItem: types.QUERY_ITEM,
      queryItems: types.QUERY_ITEMS,
      saveItem: types.SAVE_ITEM
    }),
    onSearch (item) {
      this.$_common_setLoading(1)
      try {
        this.queryItem(item)
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onSearchItems () {
      this.$_common_setLoading(1)
      try {
        this.clearItem()
        this.clearItems()
        this.queryItems().then((res) => {
          if (!this.item.id && this.items.length > 0) this.onSearch(this.items[0])
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onSelectPage (page) {
      this.setParam({ ...this.param, page: page })
      this.onSearchItems()
    }
  }
}
</script>
