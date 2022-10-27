<template>
  <div class="pagination center">
    <button
      :disabled="propsData.first"
      @click="onMove(0)"
    >
      {{ '<<' }}
    </button>
    <button
      :disabled="propsData.first"
      @click="onMove(propsData.page - 1)"
    >
      {{ '<' }}
    </button>
    <button
      v-for="page in pages"
      :key="page"
      :class="[{'current': page === propsData.page}]"
      @click="onMove(page)"
    >
      {{ page + 1 }}
    </button>
    <button
      :disabled="propsData.last"
      @click="onMove(propsData.page + 1)"
    >
      {{ '>' }}
    </button>
    <button
      :disabled="propsData.last"
      @click="onMove(propsData.totalPages - 1)"
    >
      {{ '>>' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

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

  computed: {
    pages () {
      let min = Math.max(0, this.propsData.page - 2)
      let max = Math.min(min + 5, this.propsData.totalPages)
      min = max - min < 5 ? Math.max(0, this.propsData.page - 4) : min
      return Array.from({ length: max - min }, (v, i) => min + i)
    }
  },

  methods: {
    onMove (page) {
      this.$emit('move', { page })
    }
  }
}
</script>
