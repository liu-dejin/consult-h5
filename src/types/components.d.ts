import type CpIcon from '@/components/cp-icon.vue'
import type CpNavBar from '@/components/cp-nav-bar.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
