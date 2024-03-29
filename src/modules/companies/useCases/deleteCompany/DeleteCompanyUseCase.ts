import { inject, injectable } from "tsyringe";
import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

@injectable()
class DeleteCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) { }

  async execute(id: string): Promise<void> {
    await this.companiesRepository.delete(id)

    return
  }
}

export { DeleteCompanyUseCase }
