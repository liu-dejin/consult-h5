import { createPinia } from 'pinia'

/**
 * 创建并导出 Pinia 实例
 * Pinia 是 Vue 的状态管理库，用于跨组件状态共享
 */
const pinia = createPinia()

export default pinia

// 导出全部模块
export * from './modules/user'
