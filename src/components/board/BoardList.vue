<template>
  <table class="list">
    <colgroup>
      <col width="80%">
      <col width="*">
    </colgroup>
    <thead>
      <tr>
        <th colspan="2" class="tl">
          게시판의 글 목록...
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in propsData" :key="index">
        <th class="tl">
          <a href="javascript:void(0)" @click="$emit('selectItem', item)">{{ item.title }}</a>
        </th>
        <td class="tc">
          {{ item.writer || 'Admin' }}
        </td>
      </tr>
      <tr v-for="i in propsPagination.size - propsData.length" :key="`empty${i}`">
        <td class="tl" colspan="999" style="text-indent: -999px; overflow: hidden;">Empty</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          <Pagination :props-data="propsPagination" @select="$emit('selectPage', $event)"/>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'BoardList',
  props: {
    propsData: { type: Array, default: () => { return [] } },
    propsPagination: { type: Object, default: () => { return {} } }
  }
}
</script>
