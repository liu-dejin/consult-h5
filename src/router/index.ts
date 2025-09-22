import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  // vue2 mode: history/hash
  // vue3 history: createWebHistory/createWebHashHistory
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 页面的访问拦截前置路由守卫
// ['/login', '/other'] 无token也可以访问的页面
router.beforeEach((to) => {
  document.title = `在线问诊-${to.meta.title || ''}`
  const store = useUserStore()
  // ts机制 类型检查 没有初始化就需要 加可选操作符
  // 代码执行之前 就把一些隐含的类型错误抛出
  if (!store.user.token && !['/login', '/other'].includes(to.path)) return '/login'
})

export default router
