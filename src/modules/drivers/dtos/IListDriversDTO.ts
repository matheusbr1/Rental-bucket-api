import { Driver } from "../infra/typeorm/entities/Driver"

export interface IListDriversInDTO {
  company_id: string
  page: number
  limit: number
}

export interface IListDriversOutDTO {
  drivers: Driver[]
  pageCount: number
  total: number
}