<template>
  <div class="list">
    <ul>
      <MenuSettingItem v-for="(item, index) in buffer" :key="index" :props-data="item"/>
    </ul>
  </div>
  <div class="form">
    <div class="buttonArea w100p tr">
      <template v-if="$constant.editMode.isRead(editMode)">
        <button @click="onCreate">신규</button>
        <button @click="onUpdate">수정</button>
        <button @click="onDelete">삭제</button>
      </template>
      <template v-else>
        <button @click="onCancel">취소</button>
        <button @click="onSave">저장</button>
      </template>
    </div>
    <input v-model="selectItem.name" :v-bind:readonly="$constant.editMode.isRead(editMode)" type="text" class="w100p" placeholder="메뉴명">
    <input v-model="selectItem.sequence" :v-bind:readonly="$constant.editMode.isRead(editMode)" type="number" class="w100p" placeholder="메뉴순서">
    <select v-show="false" v-model="selectItem.role" :v-bind:disabled="$constant.editMode.isRead(editMode)" class="w100p">
      <option :value="null">전체</option>
      <option :value="$constant.role.normal">일반사용자</option>
      <option :value="$constant.role.admin">관리자</option>
    </select>
  </div>
  <Alert ref="Alert"/>
</template>

<script>
import { mapActions, mapGetters } from '@/store/store'
import types from '@/store/types'

import commonMixin from '@/mixin/commonMixin'
import utilMixin from '@/mixin/utilMixin'

import MenuSettingItem from '@/components/setting/MenuSettingItem'
import Alert from '@/components/global/Alert'

import menuApi from '@/server/menuApi'

export default {
  name: 'MenuSetting',
  components: { Alert, MenuSettingItem },
  mixins: [commonMixin, utilMixin],
  provide () {
    return {
      onSelect: (item) => {
        if (this.$constant.editMode.isEdit(this.editMode)) {
          alert('입력중...')
          return false
        }
        if (this.selectItem) this.selectItem.isSelect = false
        this.selectItem = (this.selectItem === item ? {} : item)
        if (this.selectItem) this.selectItem.isSelect = true
      }
    }
  },
  data () {
    return {
      editMode: this.$constant.editMode.read,
      buffer: [],
      selectItem: {
        id: null,
        parentId: null,
        name: null,
        sequence: null,
        role: null
      },
      originItem: null
    }
  },
  computed: {
    ...mapGetters({
      menuItems: types.MENU_ITEMS
    })
  },
  mounted () {
    this.copyToBuffer()
  },
  methods: {
    ...mapActions({
      queryMenuItems: types.QUERY_MENU_ITEMS
    }),
    copyToBuffer () {
      this.buffer = this.$_util_cloneDeep(this.menuItems)
    },
    onSelect () {
      this.queryMenuItems().then(() => {
        this.copyToBuffer()
        this.editMode = this.$constant.editMode.read
      })
    },
    async onSave () {
      if (!this.saveBefore(this.selectItem)) return
      this.$_common_setLoading(1)
      try {
        let result
        switch (this.editMode) {
          case this.$constant.editMode.create:
            result = await menuApi.create(this.selectItem)
            this.selectItem.id = result.data
            break
          case this.$constant.editMode.update:
            result = await menuApi.update(this.selectItem)
            break
        }
        this.editMode = this.$constant.editMode.read
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onCreate () {
      this.originItem = this.selectItem
      this.editMode = this.$constant.editMode.create
      let newItem = { id: null, parentId: this.selectItem?.id, name: null, sequence: null, role: null, isSelect: true, children: [] }
      if (this.selectItem.isSelect) {
        this.selectItem.isSelect = false
        this.selectItem.children.push(newItem)
      } else {
        this.buffer.push(newItem)
      }
      this.selectItem = newItem
    },
    onUpdate () {
      this.originItem = this.$_util_cloneDeep(this.selectItem)
      this.editMode = this.$constant.editMode.update
    },
    onDelete (item) {
      if (item.id === null) {
        this.buffer.splice(this.buffer.findIndex(temp => temp === item), 1)
        return
      }
      this.$refs.Alert.onShow(this.$constant.message.isDelete, { buttons: [this.$constant.confirm.no, this.$constant.confirm.yes] }).then(async (res) => {
        switch (res) {
          case this.$constant.confirm.yes:
            this.$_common_setLoading(1)
            try {
              await menuApi.delete(item)
              this.buffer.splice(this.buffer.findIndex(temp => temp === item), 1)
            } catch (e) {
              console.error(e)
            } finally {
              this.$_common_setLoading(-1)
            }
            break
        }
      })
    },
    onCancel () {
      switch (this.editMode) {
        case this.$constant.editMode.create:
          this.originItem.children.splice(this.originItem.children.findIndex((item) => item.id === this.selectItem.id), 1)
          this.selectItem = this.originItem
          if (this.selectItem.id) this.selectItem.isSelect = true
          break
        case this.$constant.editMode.update:
          this.selectItem.name = this.originItem.name
          this.selectItem.sequence = this.originItem.sequence
          this.selectItem.role = this.originItem.role
          this.originItem = null
          break
      }
      this.editMode = this.$constant.editMode.read
    },
    saveBefore (item) {
      let msg = []
      if (!item.name) msg.push('메뉴명을 입력해주세요.')
      if (!item.sequence && item.sequence !== 0) msg.push('비밀번호를 입력해주세요.')
      if (msg.length > 0) this.$refs.Alert.onShow(msg, { buttons: [this.$constant.confirm.yes] })
      return msg.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 140px;
  border: 1px solid white;
  padding: 4px;
  margin-right: 5px;
  display: inline-grid;
}

.form {
  width: calc(100% - 145px);
  border: 1px solid white;
  display: inline-grid;
}
</style>
