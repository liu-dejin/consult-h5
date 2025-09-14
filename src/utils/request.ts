import { useUserStore } from '@/stores'
import router from '@/router'
import axios, { type Method } from 'axios'
import { showFailToast } from 'vant'

// 1. axios实例，基础配置
const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000 // 请求超过10秒就报错
})

/**
 * 请求拦截器
 *
 * 在请求发送前，自动添加用户token到请求头中
 * 如果用户已登录（存在token），则在每个请求的Authorization头中添加Bearer token
 *
 * @param config - axios请求配置对象
 * @returns 修改后的请求配置对象
 */
instance.interceptors.request.use(
  config => {
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * 响应拦截器
 *
 * 处理响应数据和错误状态码
 * 当响应状态码为401时，清除用户信息并跳转到登录页
 *
 * @param res - axios响应对象
 * @param err - 错误对象
 * @returns 处理后的响应数据或拒绝的Promise
 */
instance.interceptors.response.use(
  res => {
    // 当响应码不为10000时，显示失败提示并返回拒绝的Promise
    if (res.data?.code !== 10000) {
      showFailToast(res.data.message || '登录失败')
      return Promise.reject(res.data)
    }
    // 返回响应数据
    return res.data
  },
  err => {
    // 当响应状态码为401时，清除用户信息并跳转到登录页
    if (err.response?.status === 401) {
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

/**
 * 定义响应数据的类型结构
 *
 * @template T - 数据部分的类型
 */
type Data<T> = {
  code: number
  message: string
  data: T
}

/**
 * 请求工具函数
 *
 * 发送HTTP请求并返回响应数据
 *
 * @template T - 响应数据的类型
 * @param url - 请求地址
 * @param method - 请求方法，默认为'get'
 * @param submitData - 提交的数据，可选
 * @returns Promise对象，解析为响应数据
 */
const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, instance, request }
