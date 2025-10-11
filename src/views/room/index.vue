<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io, Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enums'
import type { ConsultOrderItem } from '@/types/consult'
import { getConsultOrderDetailApi } from '@/api/consult'

const store = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
const consult = ref<ConsultOrderItem>()
const loadConsult = async () => {
  const res = await getConsultOrderDetailApi(route.query.orderId as string)
  consult.value = res.data
}
let socket: Socket
onMounted(() => {
  loadConsult()
  socket = io(baseURL, {
    auth: { token: `Bearer ${store.user.token}` },
    query: { orderId: route.query.orderId }
  })
  socket.on('connect', () => {
    console.log('连接成功')
  })
  socket.on('disconnect', () => {
    console.log('断开连接')
  })
  socket.on('error', (err) => {
    console.log('错误', err)
  })
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // data [{createTime},...items]
    const arr: Message[] = []
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime
        },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)
  })
  // 监听订单变化的状态
  socket.on('statusChange', () => loadConsult())
})
onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <!-- 1. 问诊状态-->
    <room-status />
    <!-- 2. 问诊聊天列表消息 -->
    <room-message v-for="item in list" :key="item.id" :item="item" />
    <!-- 3. 底部操作栏：发消息 -->
    <room-action />
  </div>
</template>
<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
