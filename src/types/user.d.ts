/**
 * 登录和个人中心、家庭档案类型
 * 技巧：结合后台接口文档返回数据类型和业务需求，定义类型
 */
// 1. 登录响应数据
export interface User {
  account?: string
  avatar?: string
  id?: string
  mobile?: string
  refreshToken?: string
  token: string
}

// 短信验证码类型
export type CodeType = 'login' | 'register'


// 2. 登录人信息（个人中心）
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 3. 家庭档案-患者信息
export type Patient = {
  id?: string
  name: string
  idCard: string
  defaultFlag: 0 | 1
  gender: 0 | 1
  genderValue?: string
  age?: number
}

// 4. 家庭档案-患者信息列表
export type PatientList = Patient[]
