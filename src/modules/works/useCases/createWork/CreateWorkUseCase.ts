import { cpf } from 'cpf-cnpj-validator'
import { IWorksRepository } from '../../repositories/IWorksRepository'

interface IRequest {
  customer_CPF_CNPJ: number
  driver_CPF: number
  truck: string
  equipment: string
  quantity: number
  type: string
}

class CreateWorkUseCase {
  constructor(private worksRepository: IWorksRepository) {}

  execute(data: IRequest) {
    const isDriverCPFValid = cpf.isValid(String(data.driver_CPF))
  
    if (!isDriverCPFValid) {
      throw new Error('The driver CPF is invalid')
    } 

    this.worksRepository.create(data)
  }
}

export { CreateWorkUseCase }