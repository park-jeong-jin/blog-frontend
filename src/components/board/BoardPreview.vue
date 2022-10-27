<template>
  <div>
    <div>
      <strong>{{ propsData.title }}</strong>
      <p>{{ propsData.content }}</p>
    </div>
    <div style="float: right; width: 150px; background-color: red;">maybe image</div>
  </div>
</template>

<script>
export default {
  name: 'BoardPreview',
  props: {
    propsData: {
      type: Object,
      Required: true,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
