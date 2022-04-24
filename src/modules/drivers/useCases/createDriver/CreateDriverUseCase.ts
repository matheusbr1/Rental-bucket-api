import { IDriversRepository } from "../../repositories/IDriversRepository"
import { cpf } from 'cpf-cnpj-validator'
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO"
import { inject, injectable } from "tsyringe"

@injectable()
class CreateDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) {}

  async execute(data: ICreateDriverDTO) {
    const driverAlredyExists = await this.driversRepository.findByCPF(data.CPF)

    if (driverAlredyExists) {
      throw new AppError('This driver already exists')
    }
  
    const isCPFValid = cpf.isValid(String(data.CPF))
  
    if (!isCPFValid) {
      throw new AppError('This CPF is invalid')
    } 

    const driver = await this.driversRepository.create(data)

    return driver
  }
}

export { CreateDriverUseCase }