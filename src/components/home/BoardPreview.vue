<template>
  <div class="preview">
    <table>
      <thead>
        <tr>
          <th class="tl" colspan="2" style="text-overflow: ellipsis;">{{ propsData.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tr">{{ propsData.createdDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BoardPreview',
  props: {
    propsData: { type: Object, Required: true, default: () => { return {} } }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  th, td {
    padding: 2px;
  }

  th {
    font-size: large;
  }

  td {
    font-size: smaller;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
