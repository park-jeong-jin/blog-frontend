<template>
  <table class="list">
    <colgroup>
      <col width="80%">
      <col width="*">
    </colgroup>
    <thead>
      <tr>
        <th style="text-align: left;">댓글</th>
        <th>작성자</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in items" :key="index">
        <tr>
          <th style="text-align: left;">
            <span>{{ item.content }}</span>
            <button @click="item.isEdit = !item.isEdit">대댓글</button>
          </th>
          <td class="tc">
            {{ item.writer || 'Admin' }}
          </td>
        </tr>
        <tr v-if="item.isEdit">
          <td>
            <input type="text">
          </td>
          <td>
            <button @click="(e) => onSaveSub(e, item)">저장</button>
          </td>
        </tr>
        <template v-for="(child, cIndex) in item.children" :key="index + '_' + cIndex">
          <tr>
            <th style="text-align: left;">
              <span>{{ child.content }}</span>
              <button @click="item.isEdit = !item.isEdit">대댓글</button>
            </th>
            <td class="tc">{{ item.writer || 'Admin' }}</td>
          </tr>
          <tr v-if="child.isEdit">
            <td>
              <input type="text">
            </td>
            <td>
              <button @click="(e) => onSaveSub(e, child)">저장</button>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <input v-model="buffer.content" type="text">
        </td>
        <td>
          <button @click="onSave">저장</button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import commonMixin from '@/mixin/commonMixin'

import api from '../../server/commentApi'

export default {
  name: 'Comment',
  components: {},
  mixins: [commonMixin],
  props: {
    propsBoard: { type: Number, default: 0 }
  },
  data () {
    return {
      items: [],
      buffer: {
        boardId: null,
        content: null
      }
    }
  },
  methods: {
    onSearch () {
      const param = { boardId: this.propsBoard }
      api.query(param).then((result) => {
        this.setItems(result.data)
      })
    },
    onSave () {
      const param = { ...this.buffer, boardId: this.propsBoard }
      api.create(param).then(() => {
        this.onSearch()
      })
    },
    onSaveSub (e, item) {
      const input = e.target.closest('tr').querySelector('input[type=text]')
      const param = { boardId: this.propsBoard, parentId: item.id, content: input.value }
      api.create(param).then(() => {
        this.onSearch()
      })
    },
    setItems (items) {
      this.items = items.map(item => {
        return {
          isEdit: false,
          children: { isEdit: false },
          ...item
        }
      })
    }
  }
}
</script>
