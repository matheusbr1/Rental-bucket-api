import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO";
import { Driver } from "../../infra/typeorm/entities/Driver";
import { IDriversRepository } from "../../repositories/IDriversRepository";
import * as validator from 'cpf-cnpj-validator'
import { CompaniesRepository } from "../../../companies/infra/typeorm/repositories/CompaniesRepository";

@injectable()
class UpdateDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute(id: string, data: ICreateDriverDTO): Promise<Driver> {
    const companyExists = await this.companiesRepository.findById(data.company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
    }

    let driver = await this.driversRepository.findById(id)

    if (!driver) {
      throw new AppError("Driver does not exists")
    }

    if (data?.CPF) {
      const isCPFValid = validator.cpf.isValid(String(data.CPF))

      if (!isCPFValid) {
        throw new AppError('This CPF is invalid')
      }
    }

    driver = {
      ...driver,
      ...data
    }

    const updatedDriver = await this.driversRepository.create(driver)

    return updatedDriver
  }
}

export { UpdateDriverUseCase }