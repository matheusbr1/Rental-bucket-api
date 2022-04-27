import { inject, injectable } from "tsyringe";
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

    return work
  }
}

export { WorkDetailUseCase }