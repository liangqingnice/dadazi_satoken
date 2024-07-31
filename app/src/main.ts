import {createSSRApp} from "vue";
import App from "@/App.vue";
import {appService} from "@/providers";
import {createPinia} from 'pinia'

export function createApp() {
    const app = createSSRApp(App);
    const pinia = createPinia();
    app.use(pinia);
    app.config.globalProperties.push = (url: string, param: any = {}) => {
        return appService.push(url, param);
    };

    app.config.globalProperties.pop = (url: string, param: any = {}) => {
        return appService.pop();
    };
    app.config.globalProperties.pushUser = (url: string, param: any = {}) => {
        return appService.pushUser(url, param);
    };

    return {
        app,
    };
}
