import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import '@/styles/main.css'
// 导入数据持久化插件
import persist from 'pinia-plugin-persistedstate'
// pinia注册插件
pinia.use(persist)
// 创建根实例
const app = createApp(App)
// 注册路由和pinia
app.use(router)
app.use(pinia)

// 挂载根组件
app.mount('#app')
