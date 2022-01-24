import { Driver } from "../models/Driver";

// Data Transfer Object -> DTO
interface ICreateDriverDTO {
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

// Meu contrato para o DB, liskov substitution principle 
interface IDriversRepository {
  create(data: ICreateDriverDTO): void
  list(): Driver[]
  findByCPF(CPF: number): Driver
}

export { IDriversRepository, ICreateDriverDTO }