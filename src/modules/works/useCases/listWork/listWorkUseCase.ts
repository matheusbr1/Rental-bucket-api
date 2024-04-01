import { inject, injectable } from "tsyringe";
import { Work } from "../../infra/typeorm/entities/Work";
import { IWorksRepository } from "../../repositories/IWorksRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class ListWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) { }

  async execute(company_id: string): Promise<Work[]> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    const allWorks = await this.worksRepository.listByCompanyId(company_id)

    return allWorks
  }
}

export { ListWorkUseCase }