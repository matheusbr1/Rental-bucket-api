import { IDriversRepository } from "../../repositories/IDriversRepository"
import { cpf } from 'cpf-cnpj-validator'
import { AppError } from "../../../../errors/AppError"

interface IRequest {
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

class CreateDriverUseCase {
  constructor(private driversRepository: IDriversRepository) {}

  execute(data: IRequest) {
    const driverAlredyExists = this.driversRepository.findByCPF(data.CPF)

    if (driverAlredyExists) {
      throw new AppError('This driver already exists')
    }
  
    const isCPFValid = cpf.isValid(String(data.CPF))
  
    if (!isCPFValid) {
      throw new AppError('This CPF is invalid')
    } 

    this.driversRepository.create(data)
  }
}

export { CreateDriverUseCase }