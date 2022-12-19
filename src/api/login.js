import request from "@/utils/request"  //导入request.js中的request
import store from '@/store'
/**
 * 用户登录
 */
export function login(data) {
    return request({
        method: 'POST',
        url: 'v1_0/authorizations',
        data
      })
}

export function getSmsCode(mobile) {
  return request({
      url: `v1_0/sms/codes/${mobile} `,
    })
}

// 获取用户信息
export function getUserInfo() {
  return request({     
    url: 'v1_0/user',
    headers: {
      Authorization: 'Bearer ' + store?.state?.user?.token
    }
  })
}

// 获取用户频道列表
export function getUserChannels() {
  return request({
    url: 'v1_0/user/channels'
  })
}