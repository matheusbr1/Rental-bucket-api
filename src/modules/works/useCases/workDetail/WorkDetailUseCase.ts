import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Work } from "../../infra/typeorm/entities/Work";
import { IWorksRepository } from "../../repositories/IWorksRepository";

@injectable()
class WorkDetailUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(id: string): Promise<Work> {
    const work = await this.worksRepository.findById(id)

    if(!work) {
      throw new AppError('Register not found', 404)
    }

    return work
  }
}

export { WorkDetailUseCase }