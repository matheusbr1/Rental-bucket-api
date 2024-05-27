import { ICreateAddressDTO } from "../../_address/dtos/ICreateAddressDTO"
import { ICreateContactDTO } from "../../_contact/dtos/ICreateContactDTO"

// Data Transfer Object -> DTO
export interface ICreateDriverDTO {
  name: string
  CPF: number
  RG: string
  CNH: number
  birthday: string
  company_id: string
  address: ICreateAddressDTO
  contacts: ICreateContactDTO[]
}