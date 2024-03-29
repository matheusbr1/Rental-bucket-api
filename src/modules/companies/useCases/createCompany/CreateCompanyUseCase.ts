import { ICompaniesRepository } from "../../repositories/ICompaniesRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateCompanyDTO } from "../../dtos/ICreateCompanyDTO"
import { inject, injectable } from "tsyringe"

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) { }

  async execute(data: ICreateCompanyDTO) {
    const companyAlreadyExists = await this.companiesRepository.findByName(data.name)

    if (companyAlreadyExists) {
      throw new AppError('This company already exists')
    }

    const company = await this.companiesRepository.create(data)

    return company
  }
}

export { CreateCompanyUseCase }
