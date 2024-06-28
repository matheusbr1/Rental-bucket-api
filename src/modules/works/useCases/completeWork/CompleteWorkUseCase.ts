import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IWorksRepository } from "../../repositories/IWorksRepository";
import { WorkStatus } from "../../infra/typeorm/entities/Work";

@injectable()
class CompleteWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) { }

  async execute(id: string): Promise<void> {
    if (!id) {
      new AppError('Missing work id')
    }

    let work = await this.worksRepository.findById(id)

    if (!work) {
      new AppError('Work not found')
    }

    work = {
      ...work,
      status: WorkStatus.REMOVED
    }

    await this.worksRepository.create(work)

    return
  }
}

export { CompleteWorkUseCase }