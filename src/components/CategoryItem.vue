<template>
  <div :class="['categoryItem', 'level' + propsLevel]">
    <span>
      <template v-if="propsData.children && propsData.children.length > 0">
        {{ propsData.name }}
      </template>
      <template v-else>
        <a href="javascript:void(0)" @click="onClick(propsData)">{{ propsData.name }}</a>
      </template>
    </span>
  </div>
  <CategoryItem
    v-for="(item, index) in propsData.children"
    :key="index"
    :props-data="item"
    :props-level="propsLevel + 1"
    @click="onClick"
  />
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    propsData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    propsLevel: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  methods: {
    onClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>
