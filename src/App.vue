<template>
  <header>
    <div>
      <router-link class="menu" to="/">Hello World...</router-link>
    </div>
    <div>
      <router-link class="menu" to="/board">Board</router-link>
      <router-link class="menu" to="/about">About</router-link>
    </div>
  </header>
  <div class="content" v-bind="$attrs">
    <router-view/>
  </div>
  <footer>
    <span>Bye</span>
  </footer>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data () {
    return {
      categoryId: 1
    }
  },

  mounted () {
    // this.$refs.boardList.onSearch()
  },

  methods: {
    onMove (item) {
      this.$router.replace('/board')
    }
  }
}
</script>
