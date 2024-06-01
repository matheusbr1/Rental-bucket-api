import { Truck } from "../infra/typeorm/entities/Truck"

export interface IListTrucksInDTO {
  company_id: string
  page: number
  limit: number
}

export interface IListTrucksOutDTO {
  trucks: Truck[]
  pageCount: number
  total: number
}