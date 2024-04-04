import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

@injectable()
class CompanyDetailUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) { }

  async execute(id: string) {
    const company = await this.companiesRepository.findById(id)

    if (!company) {
      throw new AppError('Register not found', 404)
    }

    return company
  }
}

export { CompanyDetailUseCase }
