import { Customer } from "../models/Customer";

// Data Transfer Object -> DTO
interface ICreateCustomerDTO {
  // Pessoa Física ou Jurídica
  personType: 'F' | 'J' 
  
  // Pessoa Física
  name?: string
  CPF?: number
  
  // Pessoa Física
  corporateName?: string
  CNPJ?: number
  
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

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): void
  list(): Customer[]
  findByCPF(CPF: number): Customer
  findByCNPJ(CNPJ: number): Customer
}

export { ICustomerRepository, ICreateCustomerDTO }