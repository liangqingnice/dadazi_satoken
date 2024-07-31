import { defineStore } from 'pinia'

interface UserInfo {
  access: string,
  avatar: string,
  nickName: string,
  sex: string,
  integral: number
}

const useStore = defineStore('userInfoKey', {
  state: () => {
    return {
      user: null as UserInfo | null
    }
  },
  getters: {
    getUserInfo(state): UserInfo | null {
      return state.user
    }
  },
  actions: {
    setUserInfo(data: any) {
      this.user = data
    }
  }
})
export default useStore
