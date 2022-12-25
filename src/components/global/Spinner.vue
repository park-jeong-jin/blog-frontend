<template>
  <div class="spinner"/>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style lang="scss" scoped>
div.spinner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
