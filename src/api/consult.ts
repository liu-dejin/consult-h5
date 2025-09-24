import type { DoctorPage, KnowledgePage, KnowledgeParams, PageParams } from '@/types/consult'
import { request } from '@/utils/request'

export const getKonwledgePageApi = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPageApi = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
