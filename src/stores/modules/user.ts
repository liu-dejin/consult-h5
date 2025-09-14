import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 用户store 登录相关数据
 */
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 全局变量1：登录用户
    // 空对象通过as断言指定类型
    const user = ref<User>({} as User)

    //   方法：
    // 1.存储用户信息
    const setUser = (u: User) => {
      user.value = u
    }
    // 2.删除用户信息
    const delUser = () => {
      user.value = {} as User
    }

    // 测试
    const jj = ref(1)
    const st = () => {
      jj.value++
    }
    //   返回变量和方法
    return {
      user,
      setUser,
      delUser,
      jj,
      st
    }
  },
  /**
   * 1.默认存储全部信息 以store的id为存储的key
   *   {
   * persist: true
   *  }
   * 2.自定义存储key  指定存储那些数据
   *
   */
  {
    persist: {
      key: 'cp-user',
      pick: ['user'] // 指定存储哪些数据
    }
  }
)
