import { httpService, nativeService } from '@/providers'

const osName:Array<string> =["android","ios"];

export class NativeService {
    constructor() { }

    /**
       * 拨打电话
       * @param phoneNumber 电话号码
       */
    makePhoneCall(phoneNumber: string) {
        uni.makePhoneCall({
            phoneNumber,
        });
    }

    /**
     * 获取平台下标
     */
    getPlatform() {
        return osName.indexOf(uni.getSystemInfoSync().osName);
    }
    /**
     * 获取平台名称
     */
    getPlatformName() {
        return uni.getSystemInfoSync().osName;
    }

    /**
    * 获取缓存
    */
    getStorageSync<T = any>(key: string): T {
        let value;
        try {
            value = uni.getStorageSync(key);
        } catch (e) {
            console.error(e);
        }
        return value;
    }

    /**
     * 删除缓存
     */
    removeStorageSync(key: string) {
        try {
            uni.removeStorageSync(key);
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * 设置缓存
     */
    setStorageSync(key: string, value: any) {
        try {
            uni.setStorageSync(key, value);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 获取token
     */
    getToken(){
        return nativeService.getStorageSync(httpService.TOKEN_NAME);
    }

    /**
     * 删除token
     */
    delToken(){
        return nativeService.removeStorageSync(httpService.TOKEN_NAME);
    }

    async scanCode() {
        const result = await uni.scanCode({});
        return result.result;
    }





}
export default new NativeService();
