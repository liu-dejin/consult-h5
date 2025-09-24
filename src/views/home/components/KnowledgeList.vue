<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { getKonwledgePageApi } from '@/api/consult'
// 是否触底
const loading = ref(false)
// 是否完全加载数据
const finished = ref(false)
// 列表
const list = ref<KnowledgeList>([])
const props = defineProps<{
  type: KnowledgeType
}>()
// 查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  const res = await getKonwledgePageApi(params.value)
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="暂无更多数据"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
