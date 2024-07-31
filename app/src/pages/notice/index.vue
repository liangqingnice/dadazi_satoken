<script lang="ts" setup>
import { alertService } from '@/providers'

//一键已读
const oneRead = () => {
  alertService.showToast('一键已读')
}

</script>
<template>
  <header-nav-view :show-back="true" :is-custom="true" :show-nav="true">
      消息通知
      <uni-icons type="trash" size="22"></uni-icons>
  </header-nav-view>
  <body-view>

  </body-view>
</template>
<style lang="scss">
.ellipsis-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

</style>
