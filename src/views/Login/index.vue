<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const clickRight = () => {
  // TODO 点击右侧文字按钮
  console.warn('点击了注册')
}
// 是否同意网站的使用协议
const agree = ref(false)
// 表单数据
const mobile = ref('')
const password = ref('')
// 导入校验规则
import { mobileRules, passwordRules } from '@/utils/rules'
import { showFailToast, showSuccessToast, type FormInstance } from 'vant'
import { loginByCode, loginByPassword, sendMobileCode } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

// 控制密码框眼睛图片
const isShowPass = ref(false)
// usShowPass 密码框是否显示眼睛图标
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) return showFailToast('请先同意网站使用协议')
  // 登录
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByCode(mobile.value, code.value)
  store.setUser(res.data)
  // 存在回退地址 跳回退 没有就用户中心
  showSuccessToast('登录成功')
  router.push((route.query.returnUrl as string) || '/user')
}

const isPass = ref(false)
const form = ref<FormInstance>()
const time = ref(0)
let timeId: number
const code = ref('')
const send = async () => {
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  await form.value?.validate('mobile')
  const res = await sendMobileCode(mobile.value, 'login')
  code.value = res.data.code
  showSuccessToast('发送成功')
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timeId)
    }
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timeId)
})
</script>

<template>
  <!-- 导航栏 -->
  <cp-nav-bar title="登录" right-text="注册" @clickRight="clickRight"></cp-nav-bar>
  <div class="login">
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 登录表单 -->
    <van-form ref="form" @submit="login" autocomplete="off">
      <!-- 手机号/密码输入框 -->
      <van-field
        :rules="mobileRules"
        name="mobile"
        v-model="mobile"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        :rules="passwordRules"
        v-model="password"
        placeholder="请输入密码"
        :type="isShowPass ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon
            @click="isShowPass = !isShowPass"
            :name="`login-eye-${isShowPass ? 'on' : 'off'}`"
          ></cp-icon>
        </template>
      </van-field>
      <van-field v-else placeholder="短信验证码" v-model="code">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">{{
            time > 0 ? `${time}s后出现发烧` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" block round type="primary">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  padding-top: 46px;
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
