import { Work } from "../infra/typeorm/entities/Work"

export type WorkStatus = 'done' | 'pending' | 'all'

export interface IListWorksInDTO {
  company_id: string
  page: number
  limit: number
  status: WorkStatus
}

export interface IListWorksOutDTO {
  works: Work[]
  pageCount: number
  total: number
}