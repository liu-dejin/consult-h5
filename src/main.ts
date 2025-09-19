import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
// 导入全局样式
import '@/styles/main.scss'
// 导入vant样式
import 'vant/lib/index.css'
// 导入数据持久化插件
import persist from 'pinia-plugin-persistedstate'
// 注册精灵图地图
import 'virtual:svg-icons-register'

// pinia注册插件
pinia.use(persist)
// 创建根实例
const app = createApp(App)
// 注册路由和pinia
app.use(router)
app.use(pinia)

// 挂载根组件
app.mount('#app')
