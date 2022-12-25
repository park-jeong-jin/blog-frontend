<template>
  <section class="boardDetail">
    <div class="titleArea">
      <div v-if="$constant.role.isAdmin($_common_userRole)" class="btnArea">
        <button v-if="!isEdit" @click="onCreate"> 신규</button>
        <button v-if="!isEdit && item.id !== null" @click="onUpdate"> 수정</button>
        <button v-if="!isEdit && item.id !== null" @click="onDelete"> 삭제</button>
        <button v-if="isEdit" @click="onCancel"> 취소</button>
        <button v-if="isEdit" @click="onSave"> 저장</button>
      </div>
      <input v-if="isEdit" v-model="buffer.title" type="text" class="w100p">
      <h1 v-else class="w100p title">{{ item.title || 'TITLE' }}</h1>
    </div>
    <div ref="contentArea" class="contentArea">
      <editor v-if="isEdit" v-model="buffer.content" :editable="true"/>
      <editor v-else v-model="item.content" :editable="false"/>
    </div>
    <comment v-if="!isEdit && item.id" ref="comment" :props-board="item.id"/>
  </section>
</template>

<script>
import { mapActions, mapGetters } from '@/store/board/store'
import types from '@/store/board/types'

import commonMixin from '@/mixin/commonMixin'
import utilMixin from '@/mixin/utilMixin'

import editor from '../global/Editor'
import comment from './Comment'

export default {
  name: 'BoardDetail',
  components: {
    editor,
    comment
  },
  mixins: [commonMixin, utilMixin],
  data () {
    return {
      buffer: {
        id: null,
        title: null,
        content: null,
        menuId: null
      }
    }
  },
  computed: {
    ...mapGetters({
      item: types.ITEM,
      option: types.OPTIONS
    }),
    isEdit () { return this.$constant.editMode.isEdit(this.option.editMode) },
    content: {
      get () { return this.$constant.editMode.isRead(this.option.editMode) ? this.item.content : this.buffer.content },
      set (value) { this.buffer.content = value }
    }
  },
  methods: {
    ...mapActions({
      setOptions: types.SET_OPTIONS,
      saveItem: types.SAVE_ITEM,
      deleteItem: types.DELETE_ITEM
    }),
    onClear () {
      this.setOptions({ editMode: this.$constant.editMode.empty })
      Object.keys(this.buffer).forEach(key => { this.buffer[key] = null })
    },
    onSave () {
      this.$_common_setLoading(1)
      try {
        this.saveItem(this.buffer).then((res) => {
          this.onClear()
          this.$emit('saved', { id: res.data })
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onCreate () {
      Object.keys(this.buffer).forEach(key => { this.buffer[key] = null })
      this.buffer.menuId = this.$route.params.menuId
      this.setOptions({ editMode: this.$constant.editMode.create })
    },
    onUpdate () {
      this.buffer = this.$utils.cloneDeep(this.item)
      this.setOptions({ editMode: this.$constant.editMode.update })
    },
    onDelete () {
      this.setOptions({ editMode: this.$constant.editMode.delete })
      this.$_common_setLoading(1)
      try {
        this.deleteItem(this.item).then((res) => {
          this.onClear()
          this.$emit('deleted')
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onCancel () {
      this.setOptions({ editMode: this.item?.id ? this.$constant.editMode.read : this.$constant.editMode.empty })
    }
  }
}
</script>
