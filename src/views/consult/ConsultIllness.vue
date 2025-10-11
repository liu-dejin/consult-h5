<script setup lang="ts">
import { uploadImageApi } from '@/api/consult'
import { useConsultStore } from '@/stores'
import type { ConsultIllness, Image } from '@/types/consult'
import {
  showConfirmDialog,
  showToast,
  type UploaderAfterRead,
  type UploaderFileListItem
} from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { timeOptions, flagOptions } from '@/api/constants'
//病情描述对象
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

// 上传图片
const fileList = ref<Image[]>([])
const onAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImageApi(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      //同步数据
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
const onDelete = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)
const store = useConsultStore()
const router = useRouter()

const next = () => {
  if (!form.value.illnessDesc) return showToast('请填写病情描述')
  if (form.value.illnessTime === undefined) return showToast('请选择症状的时间')
  if (form.value.illnessDesc === undefined) return showToast('请选择是否就诊过')
  // 记录病情
  store.setillness(form.value)
  // 跳转携带标识
  router.push('/user/patient?isChange=1')
}
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '您有未保存的病情描述，是否跳转填写？',
      message: '是否恢复之前填写的病情信息',
      // 不会自动关闭确认框
      closeOnPopstate: false
    }).then(() => {
      const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
      form.value = {
        illnessDesc,
        illnessTime,
        consultFlag
      }
      fileList.value = pictures || []
    })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn v-model="form.illnessTime" :options="timeOptions" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn v-model="form.consultFlag" :options="flagOptions" />
      </div>
    </div>
    <!-- 上传图片 -->
    <div class="illness-img">
      <van-uploader
        upload-icon="photo-o"
        upload-text="上传图片"
        max-count="9"
        :max-size="5 * 1024 * 1024"
        v-model="fileList"
        :after-read="onAfterRead"
        @delete="onDelete"
      ></van-uploader>
      <p class="tip" v-if="!fileList.length">上传内容仅医生可见,最多9张图,最大5MB</p>
    </div>
    <!-- 下一步 -->
    <van-button @click="next" :class="{ disabled }" type="primary" round block>下一步</van-button>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}
.illness-img {
  margin-left: 16px;
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
</style>
