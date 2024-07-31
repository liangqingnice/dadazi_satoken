<script lang="ts" setup>
interface Props {
  showBack: boolean;
  isCustom: boolean;
  showNav:boolean;
  title?: string;
}


const prop = defineProps<Props>();

</script>

<template>
  <view class="nav_bar">
    <view class="header_top" v-if="prop.showNav" >
      <view  v-if="prop.showBack"  >
        <uni-icons type="left" size="25" @tap="pop()"></uni-icons>
      </view>
      <view v-if="prop.isCustom" class="header_text " >
        <slot/>
      </view>
      <view v-if="!prop.isCustom" class="header_text ">
      <text>{{ prop.title}}</text>
      </view>
    </view>
  </view>

</template>
<style scoped lang="scss">

</style>
