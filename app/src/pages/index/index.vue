<template>
  <view class="nav_bar">
    <view>
      <swiper class="swiper" circular indicator-dots="true" autoplay="true" :interval="3000" :duration="300">
        <swiper-item>
          <image src="@/static/logo.png" mode="scaleToFill" class="pic" />
        </swiper-item>
      </swiper>
    </view>
    <view class="menu">
      <swiper style="height: 220px" indicator-dots="true">
        <swiper-item v-for="(v,index) in chunkedModuleList" :key="index">
          <view class="grid_container">
            <view v-for="(item,index) in v" class="grid_item" :key="item.id"
                  @tap="!item.askLogin?push(item.path,item.param):pushUser(item.path,item.param)">
              <view>
                <image :src="item.icon" class="grid_icon" :alt="item.title" />
              </view>
              <view>
                {{ item.title }}
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>


  </view>

</template>
<script setup lang="ts">
//通知
import { reactive, ref } from 'vue'
import { appService } from '@/providers'

interface notice {
  id: string;
  title: string;
  content: string;
}

interface Banner {
  pic: string,
  Jump_type: string
}

//最新公告信息
const noticeInfo = reactive<notice>(
  { title: '这是第一条通知公告', id: '1', content: '哈哈哈' }
)
const bannerList = reactive<Array<Banner>>(
  [{
    pic: '', Jump_type: '1'
  }, {
    pic: '', Jump_type: '1'
  }]
)
const closeNotice = () => {
  //todo 更新读取状态
}

const moduleList = reactive([
  {id: 11,
    title: '公告',
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png',
    path: '',
    param: {},
    askLogin: false
  },
  { id: 1, title: '公告', icon: './static/notice.png', path: 'notice', param: {}, askLogin: true },
  { id: 2, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 3, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 4, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 5, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 6, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 7, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 8, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 9, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false },
  { id: 10, title: '公告', icon: './static/notice.png', path: '', param: {}, askLogin: false }
])


function splitArrayIntoChunks(array: any[], chunkSize: number): any[][] {
  const chunks: any[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

const chunkedModuleList = splitArrayIntoChunks(moduleList, 8)

</script>
<style lang="scss" scoped>
.grid_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  text-align: center;
  margin-top: 10px;
}

.grid_item {
  height: 80px;
}

.grid_icon {
  width: 60px;
  height: 60px;
}


.swiper {
  height: 200px;
}

.pic {
  width: 100%;
  height: 200px;
}
</style>
