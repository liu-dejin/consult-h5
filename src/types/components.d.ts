import type CpIcon from '@/components/cp-icon.vue'
import type CpNavBar from '@/components/cp-nav-bar.vue'
import type CpRadioBtn from '@/components/cp-radio-btn.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    cpRadioBtn: typeof CpRadioBtn
  }
}
