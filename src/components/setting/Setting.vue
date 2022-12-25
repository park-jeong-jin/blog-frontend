<template>
  <div class="settingArea">
    <section>
      <div class="titleArea">
        <span :class="[isOpen.menu ? 'on' : 'off']" @click="isOpen.menu = !isOpen.menu">메뉴</span>
      </div>
      <div v-show="isOpen.menu" class="contentArea">
        <MenuSetting/>
      </div>
    </section>
    <section style="margin-top: 5px;">
      <div class="titleArea">
        <span :class="[isOpen.user ? 'on' : 'off']" @click="isOpen.user = !isOpen.user">사용자</span>
      </div>
      <div v-show="isOpen.user" class="contentArea">
        <UserSetting/>
      </div>
    </section>
  </div>
</template>

<script>
import MenuSetting from '@/components/setting/MenuSetting'
import UserSetting from '@/components/setting/UserSetting'

export default {
  name: 'Setting',
  components: { MenuSetting, UserSetting },
  data () {
    return {
      isOpen: {
        menu: true,
        user: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.titleArea {
  > span:nth-child(1) {
    vertical-align: sub;
    padding-left: 16px;
    background-repeat: no-repeat;
    background-position: left;

    &.on {
      background-image: url("@/assets/arrow-down-s-fill.svg");
    }

    &.off {
      background-image: url("@/assets/arrow-right-s-fill.svg");
    }
  }
}
</style>
