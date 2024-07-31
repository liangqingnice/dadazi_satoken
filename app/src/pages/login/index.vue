<template>
  <view class="content">
    <view class="loginBox">
      <div class="login_type">
        <h3 :class="{ 'activate': !isOneKey }" @tap="switchLoginType">账号密码</h3>
        <h3 :class="{ 'activate': isOneKey }" @tap="switchLoginType">一键登录</h3>
      </div>
      <div v-if="!isOneKey">
        <view class="inputBox">
          <view class="ipt">
            <input type="text" maxlength="11" v-model="user.access" placeholder="请输入账号" />
          </view>
          <view class="ipt">
            <input :password="!showPassword" type="text" v-model="user.password" placeholder="请输入密码" />
            <view class="flex1"></view>
            <uni-icons :type="showPassword ? 'eye-slash' : 'eye'" size="24" color="rgb(247,120,172)"
                       @tap="showPassword = !showPassword"></uni-icons>
          </view>
          <view class="forgetPwd">
            <span @tap="push('forgotPassword')">忘记密码</span>
            <span @tap="push('register')">没有账号，去注册</span>
          </view>
          <button @tap="loginSumbit">登录</button>
        </view>
        <view class="tipbox">
          <view class="txt">
            —— 其他账号登录 ——
          </view>
          <view class="otherUser">
            <uni-icons type="qq" size="40" color="rgb(66,157,250)"></uni-icons>
            <uni-icons type="weixin" size="40" color="rgb(2,187,17)"></uni-icons>
          </view>
        </view>
      </div>
      <div v-if="isOneKey">
        <button>一键登录</button>
      </div>
    </view>
    <view class="tip">
      <radio :checked="isAgree" @tap="switchAgree" />
      阅读并同意<a href="#">《用户协议》</a>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { userService } from '@/providers/api/user'
import useStore from '@/stores/user'
import { ref, reactive } from 'vue'
import { alertService, appService, httpService, nativeService } from '@/providers'

interface User {
  access: string;
  password: string;
}

//用户信息
const user = reactive<User>({ access: '18888888888', password: '111111' })
//是否是一键登录
const isOneKey = ref<boolean>(false)
//是否显示密码
const showPassword = ref<boolean>(false)
//是否同意协议
const isAgree = ref<boolean>(false)
//切换登录方式
const switchLoginType = () => {
  isOneKey.value = !isOneKey.value
}
//是否同意协议
const switchAgree = () => {
  isAgree.value = !isAgree.value
}
//登录
const loginSumbit = async () => {
  if (!isAgree.value) {
    alertService.showToast('请同意用户协议')
    return
  }
  if (!user.access) {
    alertService.showToast('请输入账号')
    return
  }
  if (!user.password) {
    alertService.showToast('请输入密码')
    return
  }
  const result = await userService.login(user)
  nativeService.setStorageSync(httpService.TOKEN_NAME, result.data.token)
  const userStore = useStore()
  userStore.setUserInfo(result.data)
  appService.switchTab('mine')

}

</script>
<style scoped lang="scss">
.activate {
  border-bottom: 2px solid;
}

.login_type {
  display: flex;
  justify-content: space-around;
  text-align: center;
}


.content {
  height: 100vh;
  background: linear-gradient(to right, rgb(255, 170, 127), rgb(247, 120, 172));
}

.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 90%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 60rpx;
  box-sizing: border-box;
}

h3 {
  color: rgb(247, 120, 172);
  font-size: 40rpx;
  letter-spacing: 10rpx;
  margin-bottom: 40rpx;
}

.ipt {
  width: 100%;
  height: 86rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  padding-left: 10rpx;
  padding-right: 10rpx;

}

.ipt input {
  margin-left: 20rpx;
  font-size: 28rpx;
}

.ipt input {
  margin-left: 20rpx;
}

.forgetPwd {
  font-size: 26rpx;
  color: #b5b5b5;
  text-align: end;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;
}

button {
  margin-top: 20rpx;
  line-height: 85rpx;
  text-align: center;
  background: linear-gradient(to right, rgb(255, 170, 127), rgb(247, 120, 172));
  border-radius: 40rpx;
  color: #fff;
  margin-top: 40rpx;
}

.tip {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f4f4f4;
  .radio >radio {
    width: 1px;
    height: 1px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
}

.tipbox {
  text-align: center;
  margin-top: 100rpx;
}

.otherUser {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
}

.txt {
  font-size: 28rpx;
  color: #cbcbcb;
}

.otherUser .uni-icons {
  margin-left: 20rpx;
}
</style>
1=
