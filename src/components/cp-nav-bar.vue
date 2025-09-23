<script setup lang="ts">
import { useRouter } from 'vue-router'
// 需求:支持传入title right-text 支持click-right事件

// 等价于this.$router
const router = useRouter()
const onClickLeft = () => {
  //回退页面    replace无法回退
  if (history.state.back) {
    // 存在回退地址就返回
    router.back()
  } else {
    // 不存在就返回首页
    router.push('/')
  }
}

//1.接受父传子的变量
defineProps<{
  title: string
  rightText?: string
}>()
//2.子传父
const emit = defineEmits<{
  //   (e: 'click-right'): void
  clickRight: [e: void]
}>()
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="emit('clickRight')"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
