<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
// 是否触底
const loading = ref(false)
// 是否完全加载数据
const finished = ref(false)
// 列表
const list = ref<number[]>([])

const onLoad = () => {
  const data = [1, 2, 3, 4, 5]
  setTimeout(() => {
    list.value.push(...data)
    // 完全加载数据
    if (list.value.length >= 20) {
      finished.value = true
    }
    loading.value = false
  }, 2000)
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
      <knowledge-card v-for="(item, i) in list" :key="i"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
