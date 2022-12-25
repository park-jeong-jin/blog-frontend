<template>
  <div class="list">
    <table>
      <colgroup>
        <col style="width: 30%;">
        <col style="width: 20%;">
        <col style="width: 20%;">
      </colgroup>
      <thead>
        <tr>
          <th>사용자명</th>
          <th>비밀번호</th>
          <th>권한</th>
          <th>활성화</th>
          <th colspan="2">
            <button @click="onCreate">신규</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in buffer" :key="index">
          <td>
            <input v-model="item.username" class="w100p">
          </td>
          <td>
            <input v-model="item.password" type="password" class="w100p">
          </td>
          <td>
            <select v-model="item.role" class="w100p">
              <option :value="$constant.role.normal">일반사용자</option>
              <option :value="$constant.role.admin">관리자</option>
            </select>
          </td>
          <td class="tc">
            <input v-model="item.activated" type="checkbox">
          </td>
          <td class="tc">
            <button @click="onDelete(item)">삭제</button>
          </td>
          <td class="tc">
            <button @click="onSave(item)">저장</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Alert ref="Alert"/>
  </div>
</template>

<script>
import commonMixin from '@/mixin/commonMixin'

import userApi from '@/server/userApi'
import Alert from '@/components/global/Alert'

export default {
  name: 'UserSetting',
  components: { Alert },
  mixins: [commonMixin],
  data () {
    return {
      buffer: []
    }
  },
  mounted () {
    this.onSelect()
  },
  methods: {
    async onSelect () {
      this.$_common_setLoading(1)
      try {
        let result = await userApi.query({})
        this.buffer = result.data
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    async onSave (item) {
      if (!this.saveBefore(item)) return
      this.$_common_setLoading(1)
      try {
        let result
        if (item.id === null) {
          result = await userApi.create(item)
          item.id = result.data
        } else {
          result = await userApi.update(item)
        }
        console.log(result)
      } catch (e) {
        console.error(e)
      } finally {
        this.$_common_setLoading(-1)
      }
    },
    onCreate () {
      this.buffer.unshift({
        id: null,
        username: null,
        role: this.$constant.role.normal,
        activated: true
      })
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
              await userApi.delete(item)
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
    saveBefore (item) {
      let msg = []
      if (!item.username) msg.push('사용자명을 입력해주세요.')
      if (item.id === null && !item.password) msg.push('비밀번호를 입력해주세요.')
      if (msg.length > 0) this.$refs.Alert.onShow(msg, { buttons: [this.$constant.confirm.yes] })
      return msg.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  border: 1px solid white;
  padding: 4px;

  thead {
    border-bottom: 1px solid white;
  }

  tbody {
    > :not(:last-child) {
      border-bottom: 1px solid white;
    }
  }

  tr {
    > :not(:last-child) {
      border-right: 1px solid white;
    }
  }
}
</style>
