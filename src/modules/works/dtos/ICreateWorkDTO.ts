// Data Transfer Object -> DTO
export interface ICreateWorkDTO {
  customer_CPF_CNPJ: number
  driver_CPF: number
  truck: string
  equipment: string
  quantity: number
  type: string
}