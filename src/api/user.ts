import type { CodeType, Patient, PatientList, User, UserInfo } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request<User>('/login/password', 'POST', { mobile, password })
//验证码登录
export const loginByCode = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request<{ code: string }>('/code', 'GET', { mobile, type })

// 获取个人信息
export const getUserInfoApi = () => request<UserInfo>('/patient/myUser')

// 获取患者列表
export const getPatientListApi = () => request<PatientList>('/patient/mylist')

//添加患者信息
export const addPatientApi = (patient: Patient) => request('/patient/add', 'POST', patient)
