const showModal = function(message: string, showCancel: boolean, callback?: () => void, cancelCallback?: () => void) {
  uni.showModal({
    title: '提示信息',
    content: message,
    showCancel,
    success(res) {
      if (res.confirm) {
        callback && callback()
      } else if (res.cancel) {
        cancelCallback && cancelCallback()
      }
    }
  })
}

export class AlertService {
  constructor() {
  }

  showToast = function(message: string, duration: number = 2000) {
    uni.showToast({
      title: message,
      icon: 'none',
      duration,
      mask: true
    })
  }

  alert = function(message: string, callback: () => void) {
    showModal(message, false, callback)
  }

  confirm = function(message: string, callback: () => void, cancelCallback?: () => void) {
    showModal(message, true, callback, cancelCallback)
  }
  //开启加载层
  showLoading = function(message: string) {
    uni.showLoading({
      title: message,
      mask: true
    })
  }
  //关闭加载层
  hideLoading = function() {
    uni.hideLoading()
  }
  //询问框
  askConfirm = function(message: string, confirmCallback: () => void, cancelCallback?: () => void): Promise<string> {
    return new Promise((resolve, reject) => {
      showModal(
        message,
        true,
        () => {
          confirmCallback()
          resolve(message);
        },
        () => {
          cancelCallback?.()
          reject();
        }
      );
    });
  }
}

export default new AlertService()
