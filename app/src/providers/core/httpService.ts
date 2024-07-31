import { alertService, appService, nativeService } from '@/providers'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const APPLICATION_JSON = 'application/json'


interface Headers {
  [key: string]: string | undefined;
}

const getHeaders = (isJsonContentType = false) => {
  const headers: Headers = {
    app_token: nativeService.getToken(),
    env: String(process.env.UNI_PLATFORM),
    platform: String(nativeService.getPlatform()),
    Accept: APPLICATION_JSON
  }
  if (isJsonContentType) {
    headers['Content-Type'] = APPLICATION_JSON
  }
  return headers
}


export class HttpService {
  readonly BASE_API =import.meta.env.VITE_APP_BASE_API+'/app'
  readonly TOKEN_NAME = 'app_token'
  readonly TIMEOUT = 10000

  constructor() {
  }

  GET<T = any>(url: string, data: any = {}, isLoding: boolean = false) {
    return this.request<T>(url, 'GET', data, isLoding)
  }

  POST<T = any>(url: string, data: any = {}, isLoding: boolean = false) {
    return this.request<T>(url, 'POST', data, isLoding)
  }

  DEL<T = any>(url: string, data: any = {}, isLoding: boolean = false) {
    return this.request<T>(url, 'DELETE', data, isLoding)
  }

  PUT<T = any>(url: string, data: any = {}, isLoding: boolean = false) {
    return this.request<T>(url, 'PUT', data, isLoding)
  }

  request<T = any>(url: string, method: HttpMethod, data: any = {}, isLoding: boolean = false) {
    return new Promise<T>((resolve, reject) => {
      const doMain = this.BASE_API + url
      if (isLoding) {
        alertService.showLoading('请求中...')
      }
      uni.request({
        url: doMain,
        method: method,
        data: data,
        timeout: this.TIMEOUT,
        header: getHeaders(method === 'POST' || method === 'PUT'),
        success: (res) => {
          console.log("res", res)
          alertService.hideLoading()
          const result: any = res.data
          if (result.code == 200) {
            resolve(result)
            return
          }
          if (result.code != 200) {
            console.log(result)
            if (result.code == 4001) {
              alertService.askConfirm("您还未登录?请先登录",()=>{
                  appService.toLogin()
              },()=>{})
              return
            }
            alertService.showToast(result.message)
            reject(result)
            return
          }
          resolve(result)
        },
        fail: (err) => {
          alertService.hideLoading()
          console.log('走了')
          reject(err)
        }
      })
    })
  }
}

export default new HttpService()
