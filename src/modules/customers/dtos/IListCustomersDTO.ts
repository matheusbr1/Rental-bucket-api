import { Customer } from "../infra/typeorm/entities/Customer"

export interface IListCustomersInDTO {
  company_id: string
  page: number
  limit: number
}

export interface IListCustomersOutDTO {
  customers: Customer[]
  pageCount: number
  total: number
}