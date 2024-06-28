import { Work } from "../infra/typeorm/entities/Work"

export interface IListWorksInDTO {
  company_id: string
  page: number
  limit: number
}

export interface IListWorksOutDTO {
  works: Work[]
  pageCount: number
  total: number
}