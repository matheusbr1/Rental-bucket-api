import * as validator from 'cpf-cnpj-validator'
import { ICustomerRepository } from "../../repositories/ICustomersRepository";

interface IRequest {
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

class CreateCustomerUseCase {
  constructor (private customerRepository: ICustomerRepository) {}

  execute(data: IRequest) {
    let customerAlreadyExists

    if (data.personType === 'F') {
      customerAlreadyExists = this.customerRepository.findByCPF(data.CPF)

      const isCPFValid = validator.cpf.isValid(String(data.CPF))
  
      if (!isCPFValid) {
        throw new Error('This CPF is invalid')
      } 
    } else {
      customerAlreadyExists = this.customerRepository.findByCNPJ(data.CNPJ)

      const isCNPJValid = validator.cnpj.isValid(String(data.CNPJ))

      if (!isCNPJValid) {
        throw new Error("This CNPJ is invalid")
      }
    }

    if (customerAlreadyExists) {
      throw new Error("Customer already exists")
    }

    this.customerRepository.create(data)
  }
}

export { CreateCustomerUseCase }