<script lang="ts" setup>
import { reactive } from 'vue'
import { alertService, stringUtil } from '@/providers'
import HeaderNavView from '@/components/header-nav-view/header-nav-view.vue'

const noticeList = reactive([
  {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id: 1
  }, {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id:1
  }, {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id: 1
  }, {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id: 1
  }, {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id: 1
  }, {
    title: '通知公告',
    content: '<div>你是最棒的士大夫哈克的身份康师傅快速导航反馈时空时间快点恢复健康是否健康收到回复就开军事对抗疗法金克拉撒旦解放昆仑山健康的飞机喀什劳动纠纷深刻理解克里斯蒂送到房间昆仑山搭街坊卡拉始飞机喀什的回复康师傅开始JFK很多事开发环境宽松的回复即可收到回复是<b>你可以的</b></div> <img src=\'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png\'/>',
    id: 1
  }
])
noticeList.forEach(item => {
  item.content = stringUtil.stripHtmlTags(item.content)
})

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
    <uni-card :title="item.title" v-for="(item,index) in noticeList" :key="index">
      <view class="ellipsis-text">
        <rich-text :nodes="item.content" v-if="item.content" />
      </view>
    </uni-card>
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
