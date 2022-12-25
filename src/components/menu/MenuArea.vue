<template>
  <nav>
    <ul>
      <MenuItem v-for="(item, index) in menuItems" :key="index" :props-data="item"/>
      <li v-if="false">
        <span :class="['menu']"><router-link class="menu" to="/about">About</router-link></span>
      </li>
      <li v-if="$constant.role.isAdmin($_common_userRole)">
        <span :class="['menu']"><router-link class="setting" to="/setting">설정</router-link></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from '@/store/store'
import types from '@/store/types'

import commonMixin from '@/mixin/commonMixin'

import MenuItem from '@/components/menu/MenuItem'

export default {
  name: 'MenuArea',
  components: {
    MenuItem
  },
  mixins: [commonMixin],
  provide () {
    return {
      onSelect: (menu) => {
        this.$router.push({ name: 'board', params: { menuId: menu.id } })
      }
    }
  },
  computed: {
    ...mapGetters({
      menuItems: types.MENU_ITEMS
    })
  },
  mounted () {
    this.queryMenuItems()
  },
  methods: {
    ...mapActions({
      queryMenuItems: types.QUERY_MENU_ITEMS
    })
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration-line: none;
}
</style>
