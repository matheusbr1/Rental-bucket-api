// Data Transfer Object -> DTO
export interface ICreateWorkDTO {
  start_date: Date
  end_date: Date
  quantity: number
  customer_id: string
  address_id: string
  truck_id: string
  driver_id: string
  work_type_id: string
  equipment_id: string
  company_id: string
}