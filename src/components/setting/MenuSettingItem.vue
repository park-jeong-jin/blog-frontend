<template>
  <li>
    <span :class="['menu', {'select': propsData.isSelect}]" @click="onClick">{{ propsData.name || '입력중...' }}</span>
    <template v-if="propsData.children.length > 0">
      <ul style="padding-left: 10px;">
        <MenuSettingItem v-for="(item, index) in propsData.children" :key="index" :props-data="item" :props-level="propsLevel+1"/>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: 'MenuSettingItem',
  inject: ['onSelect'],
  props: {
    propsData: { type: Object, default: () => { return { isSelect: false } } },
    propsLevel: { type: Number, default: () => { return 1 } }
  },
  methods: {
    onClick () {
      this.onSelect(this.propsData)
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: smaller;
  cursor: pointer;
  user-select: none;
}

.select {
  background-color: $sub-color3;
}
</style>
