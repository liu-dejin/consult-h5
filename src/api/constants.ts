import { illnessTime } from '@/enums'

export const timeOptions = [
  { label: '一周内', value: illnessTime.Week },
  { label: '一月内', value: illnessTime.Month },
  { label: '半年内', value: illnessTime.HalfYear },
  { label: '半年以上', value: illnessTime.More }
]
export const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '未就诊过', value: 0 }
]
