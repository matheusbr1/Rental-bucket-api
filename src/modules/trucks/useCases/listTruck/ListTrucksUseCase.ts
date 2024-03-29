import { inject, injectable } from "tsyringe"
import { Truck } from "../../infra/typeorm/entities/Truck"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class ListTrucksUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) { }

  async execute(company_id: string): Promise<Truck[]> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    return await this.trucksRepository.listByCompanyId(company_id)
  }
}

export { ListTrucksUseCase }