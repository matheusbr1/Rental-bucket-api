import { inject, injectable } from "tsyringe";
import { Work } from "../../infra/typeorm/entities/Work";
import { IWorksRepository } from "../../repositories/IWorksRepository";

@injectable()
class ListWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(): Promise<Work[]> {
    const allWorks = await this.worksRepository.list()

    return allWorks
  }
}

export { ListWorkUseCase }