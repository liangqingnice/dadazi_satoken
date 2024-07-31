<template>
    <view class="head_bg">
      <view class="user_header flex">
        <uni-icons type="set" size="25"></uni-icons>
        <view>
          <image class="avatar" src="@/static/logo.png"></image>
        </view>
        <view class="flex1 mf10 ">
          <view class="nickname">一条修狗</view>
          <view class="remark">修狗的一生</view>
        </view>
        <view class="flex">
          <view>
            <image src="@/static/logo.png" alt="二维码" class="ewm_icon" />
          </view>
          <view>
            <uni-icons type="right" size="25"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="list_box">
      <view v-for="(item,i) in list" class="list" :key="i">
        <view class="list_item flex" v-for="(vitem,index) in item" @tap="checkItem(vitem,index)" :key="index">
          <view>
            <uni-icons :type="vitem.iconStr" size="25"></uni-icons>
          </view>
          <view class="flex1 item_text">
            {{ vitem.text }}
          </view>
          <view v-if="vitem.isToPage">
            <uni-icons type="right" size="25"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view @tap="logout" class="logout">退出登录</view>

</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { alertService, appService, nativeService } from '@/providers'
import { userService } from '@/providers/api/user'

interface Item {
  isToPage: boolean;
  text: string;
  iconStr: string
}

const list = reactive<Array<Array<Item>>>(
  [
    [
      { isToPage: false, text: '扫一扫', iconStr: 'scan' }
    ],
    [
      { isToPage: true, text: '我的积分', iconStr: 'scan' },
      { isToPage: true, text: '我的收藏', iconStr: 'medal' },
      { isToPage: true, text: '问题反馈', iconStr: 'help' },
      { isToPage: true, text: '关于我们', iconStr: 'info' },
      { isToPage: true, text: '系统设置', iconStr: 'gear' }

    ]
  ])

//登出
const logout = async () => {
  await alertService.askConfirm('确认退出登录吗?', async () => {
    const result = await userService.logout()
    if (result.code == 200) {
      nativeService.delToken()
      alertService.showToast(result.message)
    }
  }, () => {
    //用户取消操作
  })
}
const checkItem = (item,index) => {
  console.log(item,index)
  if(!item.isToPage){
    console.log(item,index)
    if(index==0){
       const result= nativeService.scanCode()
      console.log(result)

    }
  }
}
</script>
<style lang="scss" scoped>
.head_bg {
  background: linear-gradient(135deg, #c7e9fb, #a6defa, #80d4f9, #5bc9f8, #35bef7);
  height: 210px;

  .user_header {
    position: relative;
    top: 100px;
    margin: 0px auto;
    width: 80%;
    padding: 40rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0px 0px 10px 0px #ccc;

    .avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 20rpx;
    }

    .nickname {
      font-size: 35rpx;
      font-weight: 600;
    }

    .remark {
      margin-top: 10px;
      font-size: 14px;
      color: #888;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

    }

    .ewm_icon {
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }
  }
}
.list_box {
  margin: 60rpx 40rpx 40rpx;
  box-shadow: 0rpx 0rpx 10rpx 0rpx #ccc;

  .list {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15rpx;

    .list_item {
      border-bottom: 1px solid #eee;
      background: #fff;
      padding: 20rpx;

      .item_text {
        margin-left: 20rpx;
      }
    }
  }
}

.logout {
  margin: 50rpx auto;
  width: 80%;
  background: linear-gradient(135deg, #c7e9fb, #a6defa, #80d4f9, #5bc9f8, #35bef7);
  color: #fff;
  padding: 20rpx;
  font-size: 16px;
  border-radius: 10rpx;
  box-shadow: 0 0rpx 2rpx 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s, transform 0.3s;
  text-align: center;
}
</style>
