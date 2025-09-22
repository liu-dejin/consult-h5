/**
 * 首页和极速问诊类型
 */
import { ConsultType, ConsultTime } from '@/enums'
// 1. 健康知识列表（关注、推荐、减脂、饮食）
// 文章类型
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页（data数据）
// == 泛型别名工具 ==
export type ListPage<ListData> = {
  pageTotal: number
  total: number
  rows: ListData
}
// == 列表请求参数抽离 ==
export type ListParams = {
  current: number
  pageSize: number
}

export type KnowledgePage = ListPage<KnowledgeList>

// 文章列表查询参数 => & 通过交叉类型合并
export type KnowledgeParams = ListParams & {
  type: KnowledgeType
}

// 2. 医生列表api类型
// 医生卡片
export type Doctor = {
  id: string
  name: string
  avatar: string
  hospitalName: string
  gradeName: string
  depName: string
  positionalTitles: string
  likeFlag: 0 | 1
  serviceFee: number
  consultationNum: number
  score: number
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页（data数据）
export type DoctorPage = ListPage<DoctorList>

// 3. 关注api的类型
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

// 4. 创建问诊（挂号）订单api需要参数类型
// 图片列表
export type Image = {
  id: string
  url: string
}
// 问诊记录=> 极速问诊参数
export type Consult = {
  type: ConsultType // 问诊类型：1找医生 2极速问诊 3开药问诊
  illnessType: 0 | 1 // 问诊级别：0普通  1三甲
  depId: string // 问诊科室id
  illnessDesc: string // 病情描述
  illnessTime: ConsultTime // 患病时间：1一周内2一月内3半年内4半年以上
  consultFlag: 0 | 1 // 是否问诊过：0未问诊1问诊过
  pictures: Image[] // 病例信息-图片集合
  patientId: string // 患者id
  // couponId: string // 优惠卷id
}

// 问诊记录-全部可选
// Required 转换为全部必须
// 说明：通过Partial 转换传入的类型中所有属性为可选
// 思考：为什么把Consult变成全部可选，因为Consult的数据是一步步加上去的
export type PartialConsult = Partial<Consult>

// 5. 所有科室api数据类型
// 科室
export type SubDep = {
  id: string
  name: string
}
// 一级科室
export type TopDep = SubDep & {
  child: SubDep[]
}

// 病情描述的类型
export type IllnessType = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
// 6. 问诊费api类型
// 问诊订单预支付请求参数
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付返回数据
export type ConsultOrderPreData = {
  pointDeduction: number
  couponDeduction: number
  payment: number // 应付
  couponId: number
  actualPayment: number // 实付
}

// 7. 问诊订单详情api类型
export type ConsultOrderItem = Consult & {
  id: string // 订单ID
  createTime: string
  docInfo?: Doctor
  patientInfo: Patient
  orderNo: string
  statusValue: string
  typeValue: string
  status: OrderType
  countdown: number
  prescriptionId?: string
  evaluateId: number
  payment: number
  couponDeduction: number
  pointDeduction: number
  actualPayment: number
}

// 8. 问诊订单列表api
// 问诊订单列表参数
export type ConsultOrderParams = ListParams & {
  type: ConsultType
}
// 问诊订单data
// 问诊订单单项信息
export type ConsultOrderData = ListPage<ConsultOrderItem[]>
