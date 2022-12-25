<template>
  <li>
    <span :class="['menu', propsData.children.length === 0 ? '' : isOpen ? 'on' : 'off']" @click="onClick">{{ propsData.name }}</span>
    <template v-if="propsData.children.length > 0">
      <ul v-show="isOpen">
        <MenuItem v-for="(item, index) in propsData.children" :key="index" :props-data="item" :props-level="propsLevel+1" class="router-link"/>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: 'MenuItem',
  inject: ['onSelect'],
  props: {
    propsData: { type: Object, default: () => { return {} } },
    propsLevel: { type: Number, default: () => { return 1 } }
  },
  data () {
    return {
      isOpen: this.propsLevel === 1
    }
  },
  methods: {
    onClick () {
      if (this.propsData.children.length > 0) this.isOpen = !this.isOpen
      else this.onSelect(this.propsData)
    }
  }
}
</script>
