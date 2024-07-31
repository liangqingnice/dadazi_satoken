<template>
    <view class="form">
        <view class="flex form_item border_bottom">
            <text class="form_item_text">手机号</text>
            <view class="flex1">
                <input class="form_item_input" type="number"  maxlength="11"  v-model="user.access" placeholder="请输入手机号">
            </view>
        </view>
        <view class="flex form_item border_bottom">
            <text space="emsp" class="form_item_text">密&emsp;码</text>
            <view class="flex">
                <view class="flex1">
                    <input class="form_item_input " :password="!showPassword" v-model="user.password"
                        placeholder="请输入密码" />
                </view>
                <view>
                    <uni-icons :type="showPassword ? 'eye-slash' : 'eye'" size="24"
                        @tap="showPassword = !showPassword"></uni-icons>
                </view>
            </view>
        </view>
        <view class="flex form_item ">
            <text class="form_item_text">验证码</text>
            <view class="flex1">
                <input class="form_item_input" type="number" v-model="user.captcha" placeholder="请输入短信验证码">
            </view>
            <view>
                <button class="btn" @tap="sendCaptcha" :disabled="isSend">{{ sendCaptchaText }}</button>
            </view>
        </view>
        <button @tap="registerSubmit">注册</button>
    </view>
</template>
<script setup lang="ts">
import { onHide } from "@dcloudio/uni-app";
import { ref, reactive } from 'vue';
import { alertService,appService } from '@/providers';
import { userService } from '@/providers/api/user';
interface User {
    access: string;
    password: string;
    captcha: string;
    captchaKey?: string
}
//显示/隐藏密码
const showPassword = ref<boolean>(false);
//用户信息
const user = reactive<User>({ access: '', password: '', captcha: '' });
//是否发送验证码
const isSend = ref<boolean>(false);
//发送验证码文本
const sendCaptchaText = ref<string>('发送验证码');
//倒计时
const countdown = ref(60);

let timer: ReturnType<typeof setTimeout> | number | NodeJS.Timeout;


//发送验证码
const sendCaptcha = async () => {
    if (!user.access) {
        alertService.showToast("请输入手机号");
        return;
    }
    if (user.access.length != 11) {
        alertService.showToast("手机号格式不正确");
        return;
    }
    const res = await userService.sendCode({ access: user.access });
    const { captcha, captchaKey } = res.data;
    user.captchaKey = captchaKey;
    if (captcha) {
        user.captcha = captcha;
    }
    isSend.value = true;
    timer = setInterval(() => {
        sendCaptchaText.value = `重新发送${countdown.value ? countdown.value : ''}`;
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            // 倒计时结束时清除定时器
            clearInterval(timer);
            isSend.value = false; // 隐藏验证码输入框或执行其他操作
            countdown.value = 60;
        }
    }, 1000);
};
/**
 * 用户注册
 */
const registerSubmit = async() => {
    if (!user.access) {
        alertService.showToast("请输入手机号");
        return;
    }
    if (user.access.length != 11) {
        alertService.showToast("手机号格式不正确");
        return;
    }
    if (!user.password) {
        alertService.showToast("请输入密码");
        return;
    }
    if (!user.captcha) {
        alertService.showToast("请输入验证码");
        return;
    }
    const result= await userService.register(user);
    if(result.code==200){
        alertService.showToast("注册成功");
        appService.pop();
    }
};



//离开页面触发
onHide(() => {
    clearInterval(timer);
});

</script>
<style lang="scss" scoped>
.form {
    font-size: 16px;
    margin: 10px;

    .form_item {
        height: 2.6875rem;

        .form_item_text {
            font-size: 20px;
        }

        .form_item_input {
            width: 100%;
            padding-left: 10px;
        }

        .btn {
            display: inline;
            padding: 5px;
        }
    }

}
.border_bottom {
    border-bottom: 1px solid #ccc;
}

</style>
