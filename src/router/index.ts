import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // vue2 mode: history/hash
  // vue3 history: createWebHistory/createWebHashHistory
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      children: [
        { path: '/home', component: () => import('@/views/home/index.vue') },
        { path: '/article', component: () => import('@/views/article/index.vue') },
        { path: '/notify', component: () => import('@/views/notify/index.vue') },
        { path: '/user', component: () => import('@/views/user/index.vue') }
      ]
    }
  ]
})

export default router
