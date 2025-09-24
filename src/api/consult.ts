import type { KnowledgePage, KnowledgeParams } from '@/types/consult'
import { request } from '@/utils/request'

export const getKonwledgePageApi = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
