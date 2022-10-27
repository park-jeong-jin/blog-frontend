<template>
  <div class="category">
    <CategoryItem
      v-for="(item, index) in items"
      :key="index"
      :props-data="item"
      @click="onClick"
    />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem'

import api from '../server/categoryApi'

export default {
  name: 'Category',

  components: {
    CategoryItem
  },

  data () {
    return {
      items: []
    }
  },
  created () {
    this.queryDw()
  },
  methods: {
    queryDw () {
      api.queryDw({}).then((result) => {
        this.items = result.data
      })
    },
    onClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>
