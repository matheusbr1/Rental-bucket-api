// Data Transfer Object -> DTO
export interface ICreateDriverDTO {
  name: string
  CPF: number
  RG: string
  CNH: string
  birthday: string
  address: {
    CEP: string
    street: string
    number: number
    neighborhood: string
    state: string
    city: string
    complement?: string
  }
  contact: {
    phone: string
    cellphone: string
    email: string
  }
}