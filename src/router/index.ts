import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // vue2 mode: history/hash
  // vue3 history: createWebHistory/createWebHashHistory
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
