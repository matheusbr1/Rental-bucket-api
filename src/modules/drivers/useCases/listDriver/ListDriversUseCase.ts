import { inject, injectable } from "tsyringe"
import { Driver } from "../../infra/typeorm/entities/Driver"
import { IDriversRepository } from "../../repositories/IDriversRepository"
import { AppError } from "../../../../shared/errors/AppError";
@injectable()
class ListDriversUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) { }

  async execute(company_id: string): Promise<Driver[]> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    const drivers = await this.driversRepository.listByCompanyId(company_id)

    return drivers
  }
}

export { ListDriversUseCase }