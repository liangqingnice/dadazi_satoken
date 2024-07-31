import { alertService, httpService, nativeService } from '@/providers'


const pushPage=(url: string, param: any)=> {
    const pageUrl = getPageUrl(url, param);
    uni.navigateTo({
        url: pageUrl
    });
};
export class AppService {
    constructor() { }
    push(url: string, param: any={}) {
        pushPage(url, param);
    }

    async pushUser(url: string, param: any={}){
        const token=nativeService.getToken()
        const result =  await  httpService.POST("/user/checkLogin", {})
        if(!result.data&&!token){
            nativeService.delToken();
            await alertService.askConfirm("您还未登录?请先登录", () => {
                this.toLogin()
            })
            return
        }
        pushPage(url, param);


    }
    pop(delta:number=1){
        uni.navigateBack({ delta: delta });
    }

    switchTab(url: string, param: any={}) {
       const  pageUrl= getPageUrl(url,param)
	   
        uni.switchTab({
            url:pageUrl,fail(e) {
            	console.log(e)
            }
        })
    }
    toLogin(){
        const pageUrl = getPageUrl("login", {});
        pushPage(pageUrl,{});
    }

}
export default new AppService();
const getPageUrl = function (url: string, param: any={}) {
    if (url.indexOf("pages") === -1 && url.indexOf("?") === -1) {
        url = "/pages/" + url + "/index";
    }
	
	console.log("跳转页面:",url);
    const jsonKeys = Object.keys(param);
    if (jsonKeys.length === 0) {
        return url;
    }
    //json转url参数
    const urlParams = JSON.stringify(param);
    const joiner = url.indexOf("?") === -1 ? "?" : "&";
    return url + joiner + urlParams;
};

