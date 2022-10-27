<template>
  <div class="board">
    <div class="titleArea">
      <div class="btnArea">
        <button v-if="!isEdit" @click="onNew"> 신규</button>
        <button v-if="!isEdit && item.id !== null" @click="onUpdate"> 수정</button>
        <button v-if="!isEdit && item.id !== null" @click="onRemove"> 삭제</button>
        <button v-if="isEdit" @click="onCancel"> 취소</button>
        <button v-if="isEdit" @click="onSave"> 저장</button>
      </div>
      <label>제목</label>
      <input v-if="isEdit" v-model="buffer.title" type="text">
      <span v-if="!isEdit">{{ item.title }}</span>
    </div>
    <div class="contentArea">
      <label>내용</label>
      <editor-content v-if="isEdit" :editor="editor"/>
      <span v-if="!isEdit">{{ item.content }}</span>
    </div>
    <comment v-show="!isEdit && item.id" ref="comment" :props-board="item.id"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StaterKit from '@tiptap/starter-kit'
import comment from '../Comment'

import api from '../../server/boardApi'

export default {
  name: 'BoardDetail',
  components: {
    EditorContent,
    comment
  },
  data () {
    return {
      editor: null,
      mode: 'VIEW',
      item: {
        id: null,
        title: null,
        content: null,
        comments: []
      },
      buffer: {
        id: null,
        title: null,
        content: null
      }
    }
  },
  computed: {
    isEdit () {
      return this.mode === 'EDIT' || this.mode === 'UPDATE'
    }
  },
  mounted () {
    this.editor = new Editor({
      content: '',
      extensions: [
        StaterKit
      ]
    })
  },
  beforeUnmount () {
    this.editor?.destroy()
  },
  methods: {
    onClear () {
      this.mode = 'VIEW'
      Object.keys(this.item).forEach(key => {
        this.item[key] = null
      })
      Object.keys(this.buffer).forEach(key => {
        this.buffer[key] = null
      })
    },
    onSearch (id) {
      api.queryId({ id }).then((result) => {
        this.item = result.data
        this.$refs.comment.setItems(this.item.comments)
      })
    },
    onSave () {
      switch (this.mode) {
        case 'NEW':
          api.save(this.buffer).then((result) => {
            this.$emit('saved')
            this.onClear()
            this.onSearch(result.data)
          })
          break
        case 'UPDATE':
          api.save(this.buffer).then((result) => {
            this.$emit('saved')
            this.onClear()
            this.onSearch(result.data)
          })
          break
      }
    },
    onNew () {
      Object.keys(this.buffer).forEach(key => {
        this.buffer[key] = null
      })
      this.mode = 'NEW'
    },
    onUpdate () {
      Object.keys(this.buffer).forEach(key => {
        this.buffer[key] = null
      })
      Object.keys(this.item).forEach(key => {
        this.buffer[key] = this.item[key]
      })
      this.mode = 'UPDATE'
    },
    onRemove () {
      api.delete(this.item).then(() => {
        this.$emit('saved')
        this.onClear()
      })
    },
    onCancel () {
      this.mode = 'VIEW'
    }
  }
}
</script>
